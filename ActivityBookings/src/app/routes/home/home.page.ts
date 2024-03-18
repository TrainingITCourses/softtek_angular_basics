import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';
import { Activity } from '../../domain/activity.type';
import { ActivityComponent } from './activity.component';

@Component({
  standalone: true,
  imports: [ActivityComponent, JsonPipe],
  template: `
    <article>
      <header>
        <h2>Activities</h2>
      </header>
      <main>
        @for (a of activities(); track a.id) {
          <lab-activity [activity]="a" [(favorites)]="favorites" />
        }
      </main>
      <footer>
        <small>
          Showing
          <mark>{{ activities().length }}</mark>
          activities, you have selected
          <mark>{{ favorites().length }}</mark>
          favorites.
        </small>
      </footer>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  #title = inject(Title);
  #meta = inject(Meta);
  #http = inject(HttpClient);

  //activities: WritableSignal<Activity[]> = signal([]);

  activities: Signal<Activity[]> = toSignal(
    this.#http.get<Activity[]>('http://localhost:3000/activities').pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      }),
    ),
    { initialValue: [] },
  );

  favorites: WritableSignal<string[]> = signal<string[]>([]);

  // Qué hace el toSignal() ??
  // 1 - subscribe
  // 2 - signal.set
  // 3 - unsubscribe
  // 4 - signal read-only no mutable

  // ToDo: Señal única usando operadores para preparar los datos
  // activitiesNullable: Signal<Activity[] | undefined> = toSignal(
  //   this.#http.get<Activity[]>('http://localhost:3000/activities'),
  // );

  // activities: Signal<Activity[]> = computed(() => this.activitiesNullable() || []);

  constructor() {
    this.#title.setTitle('🏡 - Home');
    this.#meta.updateTag({ name: 'description', content: 'Home page' });

    // this.#http.get<Activity[]>('http://localhost:3000/activities').subscribe({
    //   next: (result: Activity[]) => this.activities.set(result),
    //   error: () => this.activities.set([]),
    // });
  }
}
