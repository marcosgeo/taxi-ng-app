import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { AuthService, User, Token } from './auth.service';
import { createFakeToken, createFakeUser } from '../testing/factories';

describe('AuthService create', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});

describe('Authentication using a service', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
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
        expect(user).toEqual(userData);
      });

    const request = httpMock.expectOne(
      {method: 'POST', url: 'http://localhost/api/sign-up/'},
      'POST request to sign up a new user'
    );
    request.flush(userData);  // simulate a successful response and close the request
    httpMock.verify(); // verify that no other requests are outstanding
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
    const request = httpMock.expectOne('http://localhost/api/log-in/');
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

    // Confirm that the local storage data was deleted.
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
    // after each test, we verify that there are no outstanding requests.
    httpMock.verify();
  });
});
