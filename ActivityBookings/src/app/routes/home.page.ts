import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Activity } from '../domain/activity.type';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <article>
      <header>
        <h2>Activities</h2>
      </header>
      <main>
        @for (activity of activities(); track activity.id) {
          <p>
            <span>
              <a [routerLink]="['/', 'bookings', activity.slug]"> {{ activity.name }}</a>
            </span>
            <span>at {{ activity.location }} </span>
          </p>
        }
      </main>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  #title = inject(Title);
  #meta = inject(Meta);
  #http = inject(HttpClient);

  activities: WritableSignal<Activity[]> = signal([]);

  constructor() {
    this.#title.setTitle('🏡 - Home');
    this.#meta.updateTag({ name: 'description', content: 'Home page' });
    this.#http.get<Activity[]>('http://localhost:3000/activities').subscribe((result) => {
      console.log('😨 result', result.length);
      this.activities.set(result);
      console.log('this.activities', this.activities);
    });
    console.log('constructor finished');
  }
}
