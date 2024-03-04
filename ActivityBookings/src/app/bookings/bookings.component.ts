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
            min="0"
            [max]="maxNewParticipants()"
            [ngModel]="newParticipants()"
            (ngModelChange)="onNewParticipantsChange($event)"
          />
        </form>
        <p>
          Total participants: <b>{{ totalParticipants() }}</b>
        </p>
        <div>
          @for (participant of participants(); track participant.id) {
            <span>🏃‍♂️ {{ participant.id }}</span>
          }
        </div>
      </main>
      <footer>
        @if (canBook()) {
          <button class="primary" (click)="onBookingClick()">Book now</button>
        } @else {
          <p>Book your place</p>
        }
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

  participants: WritableSignal<{ id: number }[]> = signal([{ id: 1 }, { id: 2 }, { id: 3 }]);

  newParticipants: WritableSignal<number> = signal(0);

  totalParticipants: Signal<number> = computed(
    () => this.currentParticipants() + this.newParticipants(),
  );

  maxNewParticipants = computed(() => this.activity.maxParticipants - this.currentParticipants());

  isSoldOut = computed(() => this.totalParticipants() >= this.activity.maxParticipants);

  canBook = computed(() => this.newParticipants() > 0);

  constructor() {
    effect(() => {
      if (this.isSoldOut()) {
        console.log('Se ha vendido todo');
      } else {
        console.log('Hay entradas disponibles');
      }
    });
  }

  onNewParticipantsChange(newParticipants: number) {
    this.newParticipants.set(newParticipants);
    this.participants.update((participants) => {
      participants = participants.slice(0, this.currentParticipants());
      for (let i = 1; i <= newParticipants; i++) {
        participants.push({ id: this.currentParticipants() + i });
      }
      return participants;
    });
  }

  onBookingClick() {
    console.log('Booking saved for participants: ', this.newParticipants());
  }
}
