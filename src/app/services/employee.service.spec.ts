import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { mockEmployeeService } from './mock-service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: EmployeeService, useValue: mockEmployeeService}
      ]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
