import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService, User, Token } from './auth.service';
import { createFakeToken, createFakeUser } from '../testing/factories';

fdescribe('AuthService create', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});

fdescribe('Authentication using a service', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should allow a user to sign up for a new account', () => {
    // set up the data
    const userData = createFakeUser();
    const photo = new File(['photo'], userData.photo, { type: 'image/jpg' });

    // Execute the function under test
    authService
      .signUp(
        userData.username,
        userData.first_name,
        userData.last_name,
        'pAsswOrd',
        userData.group,
        photo
      )
      .subscribe((user: User) => {
        expect(user).toBe(userData);
      });

    const request = httpMock.expectOne('/api/sign-up');
    request.flush(userData);
  });

  it('Should allow a user to log in to an existing account', () => {
    // Set up the data.
    const userData = createFakeUser();
    const tokenData = createFakeToken(userData);

    // A successful login should write data to local storage.
    localStorage.clear();

    // Execute the function under test.
    authService
      .logIn(userData.username, 'pAsswOrd!')
      .subscribe((user: Token) => {
        expect(user).toBe(tokenData);
      });
    const request = httpMock.expectOne('/api/log-in/');
    request.flush(tokenData);

    // Confirm that the expected data was written to local storage.
    expect(localStorage.getItem('taxi.auth')).toBe(JSON.stringify(tokenData));
  });

  it('Should allow a user to log out', () => {
    // Set up the data.
    const tokenData = {};

    // A successful logout delete local storage data.
    localStorage.setItem('taxi.auth', JSON.stringify(tokenData));

    // Execute the function under test.
    authService.logOut();

    // Confirm htat the local storage data was deleted.
    expect(localStorage.getItem('taxi.auth')).toBeNull();
  });

  it('Should determine whether a user is logged in', () => {
    // Given that the user is not logged in.
    localStorage.clear();
    expect(AuthService.getUser()).toBeFalsy();

    // When the user logs in.
    localStorage.setItem(
      'taxi.auth',
      JSON.stringify(createFakeToken(createFakeUser()))
    );

    // Then the user should be logged in.
    expect(AuthService.getUser()).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
