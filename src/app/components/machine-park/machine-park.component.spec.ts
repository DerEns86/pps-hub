import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineParkComponent } from './machine-park.component';
import { MachineParkService } from '../../services/machine-park.service';
import { mockEmployeeService, mockFirestoreService, mockMachineParkService } from '../../services/mock-service';
import { FirebaseService } from '../../services/firebase.service';
import { EmployeeService } from '../../services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

describe('MachineParkComponent', () => {
  let component: MachineParkComponent;
  let fixture: ComponentFixture<MachineParkComponent>;

  let machineParkService: MachineParkService;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineParkComponent],
      providers: [
        { provide: MachineParkService, useValue: mockMachineParkService },
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: FirebaseService, useValue: mockFirestoreService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatDialogModule
      ]
    })
      .compileComponents();

    machineParkService = TestBed.inject(MachineParkService);
    employeeService = TestBed.inject(EmployeeService);

    fixture = TestBed.createComponent(MachineParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
