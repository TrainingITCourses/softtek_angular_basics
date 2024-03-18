import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Activity, NULL_ACTIVITY } from '../../domain/activity.type';
import { Booking } from '../../domain/booking.type';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  #http = inject(HttpClient);
  #urlActivities = 'http://localhost:3000/activities';
  #urlBookings = 'http://localhost:3000/bookings';

  getActivityBySlug$(slug: string): Observable<Activity> {
    return this.#http.get<Activity[]>(`${this.#urlActivities}/?slug=${slug}`).pipe(
      map((activities: Activity[]) => {
        return activities[0] || NULL_ACTIVITY;
      }),
      catchError((error) => {
        console.log('error', error);
        return of(NULL_ACTIVITY);
      }),
    );
  }

  postBooking$(newBooking: Booking): Observable<Booking> {
    return this.#http.post<Booking>(this.#urlBookings, newBooking);
  }

  putActivityStatus$(activity: Activity): Observable<Activity> {
    return this.#http.put<Activity>(`${this.#urlActivities}/${activity.id}`, activity);
  }
}
