import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { Trip } from 'src/app/services/trip.service';
import { createFakeTrip } from 'src/app/testing/factories';
import { DriverDashboardComponent } from './driver-dashboard.component';
import { TripCardComponent } from '../trip-card/trip-card.component';

describe('DriverDashboardComponent', () => {
  let component: DriverDashboardComponent;
  let fixture: ComponentFixture<DriverDashboardComponent>;
  const trip1 = createFakeTrip({driver: null});
  const trip2 = createFakeTrip({ status: 'COMPLETED'});
  const trip3 = createFakeTrip({status: 'IN_PROGRESS'});

  @Component({
    selector: "app-trip-card",
    template: "",
  })
  class MockTripCardComponent {
    @Input() trips!: ReadonlyArray<Trip>;
  }

  class MockActivateRoute {
    data: Observable<Data> = of({
      trips: [trip1, trip2, trip3]
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), 
        DriverDashboardComponent,
        TripCardComponent
      ],
      declarations: [MockTripCardComponent],
      providers: [
        {provide: ActivatedRoute, useClass: MockActivateRoute}
      ]
    });
    fixture = TestBed.createComponent(DriverDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should get current trips', waitForAsync(() => {
    fixture.whenStable().then( () => {
      fixture.detectChanges();
      let tripArray = [trip3];
      expect(component.currentTrips).toEqual(tripArray);
    });
    component.ngOnInit();
  }));

  it('should get requested trips', waitForAsync( () => {
    fixture.whenStable().then( () => {
      fixture.detectChanges();
      expect(component.requestedTrips).toEqual([trip1]);
    });
    component.ngOnInit();
  }));

  it('should get completed trips', waitForAsync( () => {
    fixture.whenStable().then( () => {
      fixture.detectChanges();
      expect(component.completedTrips).toEqual([trip2]);
    }) 
  }));
});
