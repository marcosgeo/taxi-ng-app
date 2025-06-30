import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  getTrips(): Observable<ReadonlyArray<Trip>> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Beares ${accessToken}` });
    return this.http.get<ReadonlyArray<Trip>>('/api/trip/', { headers });
  }
}
