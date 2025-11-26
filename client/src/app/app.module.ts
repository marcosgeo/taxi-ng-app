import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { IsDriverService } from './services/is-driver.service';
import { IsRiderService } from './services/is-rider.service';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { RiderComponent } from './components/rider/rider.component';
import { RiderDashboardComponent } from './components/rider-dashboard/rider-dashboard.component';
import { TripListResolver } from './services/trip-list.resolver';
import { TripService } from './services/trip.service';
import { TripDetailResolver } from './services/trip-detail.resolver';
import { RouterModule } from '@angular/router';
import { TripCardComponent } from "./components/trip-card/trip-card.component";
import { DriverComponent } from './components/driver/driver.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    LandingComponent,
    LogInComponent,
    RiderComponent,
    RiderDashboardComponent,
    SignUpComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, RouterModule, TripCardComponent],
  providers: [AuthService, IsDriverService, IsRiderService, TripDetailResolver, TripListResolver, TripService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
