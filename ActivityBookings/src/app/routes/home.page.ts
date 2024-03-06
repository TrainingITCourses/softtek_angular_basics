import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACTIVITIES } from '../domain/activities.data';
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
        @for (activity of activities; track activity.id) {
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
  activities: Activity[] = ACTIVITIES;
}
