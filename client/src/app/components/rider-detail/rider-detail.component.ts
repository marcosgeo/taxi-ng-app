import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Trip } from 'src/app/services/trip.service';

@Component({
  selector: 'app-rider-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './rider-detail.component.html',
  styleUrl: './rider-detail.component.css'
})
export class RiderDetailComponent implements OnInit {
  trip!: Trip;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log("rider-detail ngOnInit called. router data: ", data)
      this.trip = data['trip']
    });
    console.log('Component initialized', this.trip);
  }
}
