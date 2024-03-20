import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ModelSignal,
  Signal,
  effect,
  model,
  viewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

/**
 * The search component (dumb component) communicates its state to parent via a model signal.
 * @description Uses an Angular reference to get the native input element. Then, it creates an observable from the input events, and emits the search term as a model signal.
 */
@Component({
  selector: 'lab-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <input #searchInput type="search" [value]="searchTerm()" placeholder="Search..." /> `,
})
export class SearchComponent {
  // * View Signals division

  // A signal with the ElementRef of the search input element
  searchInputEl: Signal<ElementRef | undefined> = viewChild('searchInput', { read: ElementRef });

  // * Model Signals division

  /** The search term model (i/o) signal */
  searchTerm: ModelSignal<string> = model<string>('');

  constructor() {
    // Resister an effect for any change on the search element, clean it, and set the search term signal
    effect(() => {
      const inputEl = this.searchInputEl();
      if (!inputEl) return;
      // Observable from html input events,
      // pipeline to clean up the input value,
      // and subscription emitting the search term as a model signal
      fromEvent<Event>(inputEl.nativeElement, 'input')
        .pipe(
          map((event: Event) => (event.target as HTMLInputElement).value),
          filter((value: string) => value.length > 2 || value.length === 0),
          debounceTime(300),
          distinctUntilChanged(),
        )
        .subscribe((cleanSearchTerm: string) => this.searchTerm.set(cleanSearchTerm));
    });
  }
}
