import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { User } from 'src/app/services/auth.service';
import { Trip, otherUser } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
})
export class TripCardComponent implements OnInit {
  @Input() title!: string;
  @Input() trips!: ReadonlyArray<Trip>;

  constructor() {}

  ngOnInit(): void {
    console.log('TripCardComponent initialized with: ', this.trips);
  }

  otherUser(trip: Trip): User | null {
    //console.log('otherUser called with', trip);
    return otherUser(trip);
  }
}
