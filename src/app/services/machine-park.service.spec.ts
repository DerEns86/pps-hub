import { TestBed } from '@angular/core/testing';

import { MachineParkService } from './machine-park.service';

describe('MachineParkService', () => {
  let service: MachineParkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineParkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
