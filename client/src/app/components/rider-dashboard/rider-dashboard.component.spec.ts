import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { createFakeTrip } from '../../testing/factories';
import { RiderDashboardComponent } from './rider-dashboard.component';
import { TripCardComponent } from '../trip-card/trip-card.component';

describe('RiderDashboardComponent', () => {
  let component: RiderDashboardComponent;
  let fixture: ComponentFixture<RiderDashboardComponent>;

  const trip1 = createFakeTrip({ driver: null });
  const trip2 = createFakeTrip({ status: 'COMPLETED' });
  const trip3 = createFakeTrip();

  class MockActivatedRoute {
    data: Observable<Data> = of({
      trips: [trip1, trip2, trip3],
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), TripCardComponent
      ],
      declarations: [RiderDashboardComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(RiderDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should get current trips', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.currentTrips).toEqual([trip1, trip3]);
      expect(1).toEqual(1); // Placeholder for actual test
    });
    component.ngOnInit();
  }));

  it('should get completed trips', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.completedTrips).toEqual([trip2]);
    });
    component.ngOnInit();
  }));
});
