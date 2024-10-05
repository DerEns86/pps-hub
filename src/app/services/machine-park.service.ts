import { inject, Injectable, OnDestroy } from '@angular/core';
import { Machine } from '../interfaces/machine';
import { FirebaseService } from './firebase.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class MachineParkService implements OnDestroy{

  private firebase = inject(FirebaseService);
  private snackbarService = inject(SnackbarService);

  public machineList: any[] = [];
  private machineListSubscription: Subscription;
  public machineTypes: string[] = ['mill', 'turn', 'millturn']

  constructor() { 
    
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
    try{
    this.firebase.addMachines(machine);
    this.machineList.push(machine)
    this.snackbarService.openSnackBar('Machine added', 'success-snackbar')
    } catch (error) {
      console.error(error)
      this.snackbarService.openSnackBar('The machine could not be added. Please check your connection and try again', 'error-snackbar')
    }
  }

  deleteMachine(docId: string) {
    try {
      this.firebase.deleteMachine(docId);
      this.snackbarService.openSnackBar('Machine deleted successfully', 'success-snackbar')
    } catch (error) {
      console.error(error)
      this.snackbarService.openSnackBar('The machine could not be deleted. Please check your connection and try again', 'error-snackbar')
    }
  }

  updateMachine(machineId: string, machine: Machine) {
    try {
      this.firebase.updateMachine(machineId, machine);
      this.snackbarService.openSnackBar('Machine updated', 'custom-snackbar')
    } catch (error) {
      console.error(error)
      this.snackbarService.openSnackBar('The machine could not be updated. Please check your connection and try again', 'error-snackbar')
    }
  }

  findMachineById(docId: string) {
    try {
      return this.firebase.getSingleDocRef('machines', docId);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
