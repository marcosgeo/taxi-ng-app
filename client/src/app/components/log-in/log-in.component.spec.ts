import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from 'src/app/services/auth.service';
import { createFakeToken, createFakeUser } from 'src/app/testing/factories';
import { LogInComponent } from './log-in.component';

fdescribe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [LogInComponent],
      providers: [AuthService],
    });

    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Shouldd allow a user to log into an existing account', () => {
    const spy = spyOn(router, 'navigateByUrl');
    const user = createFakeUser();
    const token = createFakeToken();
    component.user = { username: user.username, password: 'pAsswOd!' };
    component.onSubmit();
    const request = httpMock.expectOne('/api/log-in/');
    request.flush(token);
    expect(localStorage.getItem('taxi.auth')).toEqual(JSON.stringify(token));
    expect(spy).toHaveBeenCalledWith('');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
