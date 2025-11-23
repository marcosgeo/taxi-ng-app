import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { TripService, WritableTripData } from 'src/app/services/trip.service';

@Component({
  selector: 'app-rider-request',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './rider-request.component.html',
  styleUrl: './rider-request.component.css'
})
export class RiderRequestComponent {
  trip: WritableTripData = {
    pick_up_address: '',
    drop_off_address: '',
    status: 'REQUESTED',
    driver: null,
    rider: null
  };

  constructor(
    private router: Router,
    private tripService: TripService
  ){}

  onSubmit(): void {
    console.log("requesting a trip");
    this.trip.rider = AuthService.getUser()!;
    this.tripService.createTrip(this.trip);
    this.router.navigateByUrl('/rider');
  }
}
