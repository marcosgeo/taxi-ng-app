import { TestBed } from '@angular/core/testing';
import { createFakeToken, createFakeUser } from '../testing/factories';

import { IsDriverService } from './is-driver.service';

describe('IsDriverService', () => {
  let isDriver: IsDriverService;

  beforeEach(() => {
    isDriver = new IsDriverService();
  });

  it('should allow a driver to access a route', () => {
    localStorage.setItem('taxi.auth', JSON.stringify(
      createFakeToken(createFakeUser({group: 'driver'}))
    ));
    expect(isDriver.canActivate()).toBeTruthy();
  });

  it('should no allow a non-driver to access a route', () => {
    localStorage.setItem('taxi.auth', JSON.stringify(
      createFakeToken(createFakeUser({group: 'rider'}))
    ));
    expect(isDriver.canActivate()).toBeFalsy();
  });
});
