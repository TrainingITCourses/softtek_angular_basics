import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <nav>
        <span>
          <a [href]="author.homepage" target="_blank">By {{ author.name }}.</a>
          <div>{{ year }}</div>
        </span>
        @if (cookiesAccepted()) {
          <span>Cookies accepted!</span>
        } @else {
          <button class="secondary outline" (click)="onAcceptCookies()">Accept cookies</button>
        }
      </nav>
      <div>
        <button [hidden]="cookiesAccepted()" class="secondary outline" (click)="onAcceptCookies()">
          Accept cookies
        </button>
        <span [hidden]="cookiesPending()">Cookies accepted!</span>
      </div>
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

  year = new Date().getFullYear();

  cookiesAccepted: WritableSignal<boolean> = signal(false);

  cookiesPending: Signal<boolean> = computed(() => !this.cookiesAccepted());

  onAcceptCookies() {
    //this.cookiesAccepted.set(true);
    this.cookiesAccepted.update((valor: boolean) => !valor);
  }
}
