import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMachineComponent } from './dialog-add-machine.component';
import { MachineParkService } from '../../../services/machine-park.service';
import { mockMachineParkService, mockMatDialogRef } from '../../../services/mock-service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Machine } from '../../../interfaces/machine';

describe('DialogAddMachineComponent', () => {
  let component: DialogAddMachineComponent;
  let fixture: ComponentFixture<DialogAddMachineComponent>;

  let machineParkService: MachineParkService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    providers: [
        { provide: MachineParkService, useValue: mockMachineParkService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
    ],
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        DialogAddMachineComponent,
    ]
})
      .compileComponents();

    machineParkService = TestBed.inject(MachineParkService);

    fixture = TestBed.createComponent(DialogAddMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form', () => {
    //GIVEN
    const machine: Machine = {
      manufacturer: 'Test',
      name: 'name',
      type: 'mill',
      maxDimension: '150',
      assignedEmployee: 'test'
    }

    component.machine = machine;

    // WHEN
    component.onSubmit({ valid: true });

    // THEN
    expect(mockMachineParkService.addMachine).toHaveBeenCalledWith(machine);
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  })
});
