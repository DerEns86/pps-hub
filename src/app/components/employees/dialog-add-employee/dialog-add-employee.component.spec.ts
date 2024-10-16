import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEmployeeComponent } from './dialog-add-employee.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { mockEmployeeService, mockFirestoreService, mockMatDialogRef } from '../../../services/mock-service';
import { EmployeeService } from '../../../services/employee.service';
import { FirebaseService } from '../../../services/firebase.service';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Employee } from '../../../interfaces/employee';

describe('DialogEmployeeComponent', () => {
  let component: DialogAddEmployeeComponent;
  let fixture: ComponentFixture<DialogAddEmployeeComponent>;

  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddEmployeeComponent],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: FirebaseService, useValue: mockFirestoreService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [
        ReactiveFormsModule,
        MatOptionModule,
        MatFormFieldModule,
        MatDialogModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,

      ]
    })
      .compileComponents();

    employeeService = TestBed.inject(EmployeeService);

    fixture = TestBed.createComponent(DialogAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('saveEmployee', () => {
    it('should add a Employee when not in editMode', () => {
      //GIVEN

      component.employeeForm.setValue({
        employeeId: '1',
        name: 'Doe',
        surname: 'John',
        email: 'test@test.com',
        skills: ['mill', 'turn'],
      });

      mockEmployeeService.isInEditMode = false;

      //WHEN
      component.saveEmployee();
      //THEN
      expect(mockEmployeeService.addEmployee).toHaveBeenCalledWith({
        employeeId: '1',
        name: 'Doe',
        surname: 'John',
        email: 'test@test.com',
        activeMachine: 'none',
        skills: ['mill', 'turn'],
      })
      expect(mockEmployeeService.isInEditMode).toBe(false);
      expect(mockMatDialogRef.close).toHaveBeenCalled();
    });

    it('should update a Employee when in editMode', () => {
      //GIVEN
      component.employee = {
        id: '1',
        employeeId: '1',
        name: 'Doe',
        surname: 'John',
        email: 'test@test.com',
        activeMachine: 'none',
        skills: ['mill', 'turn'],
      }


      component.employeeForm.setValue({
        employeeId: '10',
        name: 'Doe',
        surname: 'John',
        email: 'test@test.com',
        skills: ['mill', 'turn'],
      });

      mockEmployeeService.isInEditMode = true;

      //WHEN
      component.saveEmployee();
      //THEN
      expect(mockEmployeeService.updateEmployee).toHaveBeenCalledWith({
        id: '1',
        employeeId: '10',
        name: 'Doe',
        surname: 'John',
        email: 'test@test.com',
        activeMachine: 'none',
        skills: ['mill', 'turn'],
      })
      expect(mockEmployeeService.isInEditMode).toBe(false);
      expect(mockMatDialogRef.close).toHaveBeenCalled();
    });
  })

  describe('closeDialog', () => {
    it('should close the dialog', () => {
      //GIVEN

      //WHEN
      component.cloeDialog();
      //THEN
      expect(mockMatDialogRef.close).toHaveBeenCalled();
    })
  })
});
