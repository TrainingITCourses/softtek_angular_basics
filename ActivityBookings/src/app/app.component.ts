import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'sft-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <div>Hello Softtek.</div>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'ActivityBookings';
}
