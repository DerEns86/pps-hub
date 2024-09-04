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

  machineParkService: MachineParkService = inject(MachineParkService);

machine: Machine = {
  id: '',
  manufacturer: '',
  name: '',
  position: 0,
  type: '',
  maxDimension: ''
}

machineTypes: string[] = this.machineParkService.machineTypes;

constructor(public dialogRef: MatDialogRef<DialogAddMachineComponent>) {}

onSubmit(form: any){
  if(form.valid)
  console.log('Machine Data:', this.machine);
this.machine.position = this.machineParkService.setPosition();
this.machineParkService.addMachine(this.machine);
}

}
