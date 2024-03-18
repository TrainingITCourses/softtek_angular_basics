import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  OutputEmitterRef,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'lab-booking-confirm',
  standalone: true,
  imports: [],
  template: `
    @if (canBook()) {
      <button class="primary" (click)="onBookingClick()">Book now</button>
    } @else {
      <p>Book your place</p>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingConfirmComponent {
  canBook: InputSignal<boolean> = input<boolean>(false);
  saveBooking: OutputEmitterRef<void> = output<void>();

  onBookingClick() {
    this.saveBooking.emit();
  }
}
