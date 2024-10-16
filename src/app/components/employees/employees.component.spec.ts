import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import { EmployeeService } from '../../services/employee.service';
import { mockEmployeeService } from '../../services/mock-service';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Employee } from '../../interfaces/employee';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      providers: [{ provide: EmployeeService, useValue: mockEmployeeService },],
      imports: [
        MatExpansionModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    employeeService = TestBed.inject(EmployeeService);

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete employee', () => {
    const employee: Employee = { id: '1', employeeId: '123', name: 'Doe', surname: 'John' , email: 'test@test.com', activeMachine: '1', skills: ['Java', 'Angular'] };
    component.deleteEmployee(employee);
    expect(employeeService.deleteEmployee).toHaveBeenCalledWith(employee);
  });

  it('should open add dialog', () => {
    component.openAddDialog();
    expect(employeeService.isInEditMode).toBeFalsy();
  });

  it('should get empty EmployeesList', () => {
    employeeService.employeeLists = [];
    component.getEmployeesList();
    expect(employeeService.employeeLists).toEqual([]);
  });

  it('should get EmployeesList', () => {
    mockEmployeeService.getEmployees().then(() => {
      expect(employeeService.employeeLists.length).toBeGreaterThan(0);
      expect(employeeService.employeeLists).toEqual([
        { id: '1', employeeId: '123', name: 'Doe', surname: 'John' , email: 'test@MatLine.de', activeMachine: '1', skills: ['Java', 'Angular'] },
        { id: '2', employeeId: '124', name: 'Doe', surname: 'Jane', email: 'jane@test.com', activeMachine: '2', skills: ['Java', 'React'] }
      ]);
    });
  });

});
