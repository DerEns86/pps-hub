import { Component, inject } from '@angular/core';
import { MachineParkService } from '../../services/machine-park.service';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddMachineComponent } from './dialog-add-machine/dialog-add-machine.component';

@Component({
  selector: 'app-machine-park',
  templateUrl: './machine-park.component.html',
  styleUrl: './machine-park.component.scss',

})
export class MachineParkComponent {

  private employeeService = inject(EmployeeService);
  private machineParkService = inject(MachineParkService)

  constructor(public Dialog: MatDialog) { }

  getMachineList() {
    return this.machineParkService.getMachineList();
  }

  getEmployeeAssignedToMachine(machineId: string) {
    return this.employeeService.getEployeeByAssignedMachine(machineId);
  }

  deleteMachine(id: string) {
    this.machineParkService.deleteMachine(id);
  }

  openDialog() {
    this.Dialog.open(DialogAddMachineComponent)
  }
}

