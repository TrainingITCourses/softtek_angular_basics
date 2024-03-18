import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  ModelSignal,
  input,
  model,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Activity, NULL_ACTIVITY } from '../../domain/activity.type';

@Component({
  selector: 'lab-activity',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <span>
        <input
          type="checkbox"
          name=""
          class="secondary outline"
          (click)="toggleFavorite(activity().slug)"
        />
      </span>
      <span>
        <a [routerLink]="['/', 'bookings', activity().slug]"> {{ activity().name }}</a>
      </span>
      <span>at {{ activity().location }} </span>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {
  activity: InputSignal<Activity> = input<Activity>(NULL_ACTIVITY);
  favorites: ModelSignal<string[]> = model<string[]>([]);

  toggleFavorite(slug: string) {
    this.favorites.update((currentFavorites) => {
      if (currentFavorites.includes(slug)) {
        return currentFavorites.filter((favorite) => favorite !== slug);
      }
      return currentFavorites.concat(slug);
    });
  }
}
