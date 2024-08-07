import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { createFakeToken, createFakeUser } from 'src/app/testing/factories';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let logOutButton: DebugElement;
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [LandingComponent],
      providers: [AuthService],
    });

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    localStorage.setItem(
      'taxi.auth',
      JSON.stringify(createFakeToken(createFakeUser()))
    );
    fixture.detectChanges();
    logOutButton = fixture.debugElement.query(By.css('button.btn.btn-primary'));
  });

  it('Should allow a user to log out of an account', () => {
    logOutButton.triggerEventHandler('click', null);
    expect(localStorage.getItem('taxi.auth')).toBeNull();
  });

  it('Should indicate wheter a user is logged in or not', () => {
    localStorage.clear();
    expect(component.getUser()).toBeFalsy();
    localStorage.setItem(
      'taxi.auth',
      JSON.stringify(createFakeToken(createFakeUser()))
    );
    expect(component.getUser()).toBeTruthy();
  });

  it('Should return true if the user is a rider or not', () => {
    localStorage.clear();
    localStorage.setItem(
      'taxi.auth',
      JSON.stringify(createFakeToken(createFakeUser({ group: 'rider' })))
    );
    expect(component.isRider()).toBeTruthy();
  });
});
