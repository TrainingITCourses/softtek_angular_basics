import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <a [href]="author.homepage" target="_blank">By {{ author.name }}.</a>
      <div>{{ getYear() }}</div>
      <button (click)="onAcceptCookies()">Accept cookies</button>
    </footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  author = {
    name: 'Softtek',
    homepage: 'https://www.softtek.com/es-es/',
  };

  // year = new Date().getFullYear();

  getYear() {
    return new Date().getFullYear();
  }

  onAcceptCookies() {
    console.log('Cookies accepted');
  }
}
