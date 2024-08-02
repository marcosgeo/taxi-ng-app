import { TestBed } from '@angular/core/testing';
import { createFakeToken, createFakeUser } from '../testing/factories';

import { IsRiderService } from './is-rider.service';

describe('IsRiderService', () => {
  let service: IsRiderService;

  beforeEach(() => {
    service = new IsRiderService();
  });

  it('should allow a rider to access a route', () => {
    localStorage.setItem(
      'taxi.auth',
      JSON.stringify(createFakeToken(createFakeUser({ group: 'rider' })))
    );
    expect(service.canActivate()).toBeTruthy();
  });

  it('shoud not allow a non-rider to access a route', () => {
    localStorage.setItem(
      'taxi.auth',
      JSON.stringify(createFakeToken(createFakeUser({ group: 'driver' })))
    );
    expect(service.canActivate()).toBeFalsy();
  });
});
