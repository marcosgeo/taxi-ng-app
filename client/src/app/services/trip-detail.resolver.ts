import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Trip, TripService } from './trip.service';

@Injectable({
  providedIn: 'root'
})
export class TripDetailResolver implements Resolve<Trip>{
  constructor(private tripService: TripService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Trip> {
    let trip = this.tripService.getTrip(route.params['id']);
    console.log('trip-detail resolve called. trip:', trip);
    return trip;
  }
}
