import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Machine } from '../../../interfaces/machine';
import { MachineParkService } from '../../../services/machine-park.service';

@Component({
  selector: 'app-dialog-add-machine',
  templateUrl: './dialog-add-machine.component.html',
  styleUrl: './dialog-add-machine.component.scss'
})
export class DialogAddMachineComponent {

  private machineParkService: MachineParkService = inject(MachineParkService);

  machine: Machine = {
    manufacturer: '',
    name: '',
    type: '',
    maxDimension: '',
    assignedEmployee: 'none'
  }

  machineTypes: string[] = this.machineParkService.machineTypes;

  constructor(public dialogRef: MatDialogRef<DialogAddMachineComponent>) { }

  onSubmit(form: any) {
    if (form.valid)
      this.machineParkService.addMachine(this.machine);
    this.dialogRef.close();
  }

}
