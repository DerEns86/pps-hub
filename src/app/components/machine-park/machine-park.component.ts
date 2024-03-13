import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MachineParkService } from '../../services/machine-park.service';
import { Machine} from '../../interfaces/machine';

@Component({
  selector: 'app-machine-park',
  templateUrl: './machine-park.component.html',
  styleUrl: './machine-park.component.scss',
 
})
export class MachineParkComponent {

// machineList = this.machineParkService.getMachineList();

  constructor(public machineParkService : MachineParkService) { }


getMachineList(){
  return this.machineParkService.getMachineList();
}

}

