import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <div>Hello Softtek.</div>
    <router-outlet />
  `,
  styles: [
    `
      h1 {
        color: #369;
      }
    `,
  ],
})
export class AppComponent {
  title = 'ActivityBookings';
}
