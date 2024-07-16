import { Injectable, OnDestroy } from '@angular/core';
import { Machine } from '../interfaces/machine';
import { FirebaseService } from './firebase.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineParkService implements OnDestroy{

  machineList: any[] = [];

  private machineListSubscription: Subscription;
  

  constructor(private firebase: FirebaseService) { 
    // this.addMachine(this.machineList[0]);
    // this.addMachine(this.machineList[1]);
    // this.addMachine(this.machineList[2]);
    
   

    this.machineListSubscription = this.firebase.MachinesList$.subscribe((machines) => {
      this.machineList = machines;
        });
  
  }

  ngOnDestroy() {
    this.machineListSubscription.unsubscribe();
  }

  getMachineList() {
    return this.firebase.machinesList;
  }

  addMachine(machine: Machine) {
    this.firebase.addMachines(machine);
  }
}
