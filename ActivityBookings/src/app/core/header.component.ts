import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-header',
  standalone: true,
  imports: [],
  template: ` <h1>{{ title }}!</h1> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  title = 'ActivityBookings';
}
