import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Activity } from '../domain/activity.type';

@Component({
  selector: 'lab-bookings',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, FormsModule],
  template: `
    <article>
      <header>
        <h2>{{ activity.name }}</h2>
        <p [class]="activity.status">
          <span>{{ activity.location }} </span>
          <span>{{ activity.price | currency: 'EUR' }}</span>
          <span>{{ activity.date | date: 'dd-MMM-yyyy' }}</span>
          <span>{{ activity.status | uppercase }}</span>
        </p>
      </header>
      <main>
        <p>
          Current participants: <b>{{ currentParticipants() }}</b>
        </p>
        <form>
          <label for="newParticipants">New participants:</label>
          <input
            name="newParticipants"
            type="number"
            [ngModel]="newParticipants()"
            (ngModelChange)="onNewParticipantsChange($event)"
          />
        </form>
        <p>
          Total participants: <b>{{ totalParticipants() }}</b>
        </p>
      </main>
      <footer>
        <button class="primary" (click)="onBookingClick()">Book now</button>
      </footer>
    </article>
  `,
  styles: `
    .draft {
      color: violet;
      font-style: italic;
    }
    .published {
      color: limegreen;
    }
    .confirmed {
      color: green;
    }
    .sold-out {
      color: green;
      font-style: italic;
    }
    .done {
      color: orange;
      font-style: italic;
    }
    .cancelled {
      color: red;
      font-style: italic;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent {
  activity: Activity = {
    name: 'Paddle Surf',
    location: 'Lake Leman at Lausanne',
    price: 100,
    date: new Date(2025, 7, 15),
    minParticipants: 4,
    maxParticipants: 10,
    status: 'published',
    id: 1,
    userId: 1,
    slug: 'paddle-surf',
    duration: 2,
  };
  currentParticipants: Signal<number> = signal(3);

  newParticipants: WritableSignal<number> = signal(1);

  totalParticipants: Signal<number> = computed(
    () => this.currentParticipants() + this.newParticipants(),
  );

  isSoldOut = computed(() => this.totalParticipants() >= this.activity.maxParticipants);

  constructor() {
    effect(() => {
      if (this.isSoldOut()) {
        console.log('Se ha vendido todo');
      } else {
        console.log('Hay entradas disponibles');
      }
    });
  }

  onNewParticipantsChange(newValue: number) {
    this.newParticipants.set(newValue);
  }

  onBookingClick() {
    console.log('Booking saved for participants: ', this.newParticipants);
  }
}
