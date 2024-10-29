import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { Machine } from '../../../interfaces/machine';
import { MachineParkService } from '../../../services/machine-park.service';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dialog-add-machine',
    templateUrl: './dialog-add-machine.component.html',
    styleUrl: './dialog-add-machine.component.scss',
    standalone: true,
    imports: [FormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatDialogActions, MatButton]
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
