import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Trip } from 'src/app/services/trip.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-diver-dashboard',
  standalone: true,
  imports: [TripCardComponent],
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.css'
})
export class DriverDashboardComponent implements OnInit  {
  trips!: ReadonlyArray<Trip>

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.data.subscribe(data => this.trips = data['trips']);
    console.log("driver-dashboard component. trips:", this.trips);
  }

  get currentTrips(): ReadonlyArray<Trip> {
    return this.trips.filter(trip => {
      return trip.driver !== null && trip.status !== 'COMPLETED';
    });
  }

  get requestedTrips(): ReadonlyArray<Trip> {
    return this.trips.filter(trip => {
      return trip.status === 'REQUESTED';
    })
  }

  get completedTrips(): ReadonlyArray<Trip> {
    return this.trips.filter( trip => trip.status === 'COMPLETED');
  }
}
