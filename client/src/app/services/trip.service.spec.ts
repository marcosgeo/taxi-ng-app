import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Trip, TripService } from './trip.service';
import { createFakeTrip } from '../testing/factories';

describe('TripService', () => {
  let tripService: TripService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripService, provideHttpClient(), provideHttpClientTesting()]
    });
    tripService = TestBed.inject(TripService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should allow a user to get a list of trips', () => {
    const trip1 = createFakeTrip();
    const trip2 = createFakeTrip();
    tripService.getTrips().subscribe((trips: ReadonlyArray<Trip>) => {
      expect(trips).toEqual([trip1, trip2]);
    });
    const request: TestRequest = httpMock.expectOne('/api/trip/');
    request.flush([trip1, trip2]);
  });

  it('should allow a user to create a trip', () => {
    tripService.webSocket = jasmine.createSpyObj('webSocket', ['next']);
    const trip = createFakeTrip();
    tripService.createTrip(trip);
    expect(tripService.webSocket.next).toHaveBeenCalledWith({
      type: 'create.trip',
      data: {
        ...trip, rider: trip.rider!.id
      }
    });
  });

  it('should allow a user to get a trip by ID', () => {
    const tripData: Trip = createFakeTrip();
    tripService.getTrip(tripData.id).subscribe(trip => {
      expect(trip).toEqual(tripData);
    });
    const request: TestRequest = httpMock.expectOne(`/api/trip/${tripData.id}/`);
    request.flush(tripData);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
