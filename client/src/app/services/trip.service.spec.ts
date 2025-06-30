import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { createFakeTrip } from '../testing/factories';
import { Trip } from './trip.service';

describe('TripService', () => {
  let tripService: TripService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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

  afterEach(() => {
    httpMock.verify();
  });
});
