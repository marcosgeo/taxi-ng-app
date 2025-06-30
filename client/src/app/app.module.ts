import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { IsRiderService } from './services/is-rider.service';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { RiderComponent } from './components/rider/rider.component';
import { RiderDashboardComponent } from './components/rider-dashboard/rider-dashboard.component';
import { TripListResolver } from './services/trip-list.resolver';
import { TripService } from './services/trip.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LogInComponent,
    RiderComponent,
    RiderDashboardComponent,
    SignUpComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [AuthService, IsRiderService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
