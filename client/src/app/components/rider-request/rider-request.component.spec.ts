import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TripService } from 'src/app/services/trip.service';

import { RiderRequestComponent } from './rider-request.component';
import { createFakeTrip } from 'src/app/testing/factories';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';

describe('RiderRequestComponent', () => {
  let component: RiderRequestComponent;
  let fixture: ComponentFixture<RiderRequestComponent>;
  let tripService: TripService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
     
      ],
      providers: [TripService]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderRequestComponent);
    component = fixture.componentInstance;
    tripService = TestBed.inject(TripService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle form submit', () => {
    const spyCreateTrip = spyOn(tripService, 'createTrip');
    const spyNavigateByUrl = spyOn(router, 'navigateByUrl');
    component.trip = createFakeTrip();
    component.onSubmit();
    expect(spyCreateTrip).toHaveBeenCalledWith(component.trip);
    expect(spyNavigateByUrl).toHaveBeenCalledWith('/rider');
  })
});
