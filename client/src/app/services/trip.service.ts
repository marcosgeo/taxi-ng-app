import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { share } from 'rxjs';

import { AuthService, User } from './auth.service';

export interface Trip {
  readonly id: string;
  readonly created: string;
  readonly updated: string;
  readonly pick_up_address: string;
  readonly drop_off_address: string;
  readonly status: string;
  readonly driver: User | null;
  readonly rider: User | null;
}

type WritableTrip = Omit<
  Trip, 'id' | 'created' | 'updated'
>;

type Mutable<T> = { -readonly [ P in keyof T]: T[P] };

export type WritableTripData = Mutable<WritableTrip>;

@Injectable({
  providedIn: 'root',
})
export class TripService {
  webSocket!: WebSocketSubject<any>;
  messages!: Observable<any>;

  constructor(private http: HttpClient) {}

  connect(): void {
    if (!this.webSocket || this.webSocket.closed) {
      const accessToken = AuthService.getAccessToken();
      this.webSocket = webSocket(`ws://localhost:8080/taxi/?token=${accessToken}`);
      this.messages = this.webSocket.pipe(share());
      this.messages.subscribe(message => console.log(message));
    }
  }

  getTrips(): Observable<ReadonlyArray<Trip>> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<ReadonlyArray<Trip>>('/api/trip/', { headers });
  }

  createTrip(trip: WritableTripData): void {
    console.log("createTrip called with: ", trip);
    this.connect();
    const message: any = {
      type: 'create.trip',
      data: {
        ...trip, rider: trip.rider!.id
      }
    };
    this.webSocket.next(message);
    console.log("createTrip finished with message: ", message);
  }

  getTrip(id: string): Observable<Trip>{
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({Authorization: `Bearer ${accessToken}`});
    return this.http.get<Trip>(`/api/trip/${id}/`, {headers});
  }
}
