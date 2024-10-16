import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { mockAuthService } from '../services/mock-service';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;

  const mockAuth = {
    provideAuth: provideAuth(() => getAuth()),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: Auth, useValue: mockAuth}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
