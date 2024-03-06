import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lab-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <nav>
        <a [routerLink]="['/']">
          <strong>{{ title }}</strong>
        </a>
        <a [routerLink]="['/', 'auth', 'login']">Login</a>
        <a [routerLink]="['/', 'auth', 'register']">Register</a>
      </nav>
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  title = 'ActivityBookings';
}
