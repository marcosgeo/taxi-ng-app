import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { createFakeUser } from 'src/app/testing/factories';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [SignUpComponent],
      providers: [AuthService],
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Should allow a user to sign up for an account', () => {
    const spy = spyOn(router, 'navigateByUrl');
    const user = createFakeUser();
    const photo = new File(['photo'], user.photo, { type: 'image/jpeg' });
    component.user = {
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      password: 'pAsswOrd!',
      group: user.group,
      photo,
    };
    component.onSubmit();
    const request = httpMock.expectOne('/api/sign-up/');
    request.flush(user);
    expect(spy).toHaveBeenCalledWith('/log-in');
  });
});
