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
  public machineTypes: string[] = ['mill', 'turn', 'millturn']

  constructor(private firebase: FirebaseService) { 
    
    this.machineListSubscription = this.firebase.machinesList$.subscribe((machines) => {
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
    this.machineList.push(machine)
  }

  deleteMachine(docId: string) {
    console.log(docId);
    
    this.firebase.deleteMachine(docId);
  }

  updateMachine(machineId: string, machine: Machine) {
    this.firebase.updateMachine(machineId, machine);
  }

  findMachineById(docId: string) {
    return this.firebase.getSingleDocRef('machines', docId);
  }
}
