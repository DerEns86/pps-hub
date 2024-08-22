import { Component, inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MachineParkService } from '../../services/machine-park.service';
import { Machine} from '../../interfaces/machine';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-machine-park',
  templateUrl: './machine-park.component.html',
  styleUrl: './machine-park.component.scss',
 
})
export class MachineParkComponent {

  employeeService = inject(EmployeeService);

  constructor(public machineParkService : MachineParkService) { }


getMachineList(){
  return this.machineParkService.getMachineList();
}

getEmployeeAssignedToMachine(machineId: number){
  return this.employeeService.getEployeeByAssignedMachine(machineId);
}
}

