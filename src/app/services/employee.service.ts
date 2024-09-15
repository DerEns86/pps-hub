import { Injectable, OnDestroy } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { FirebaseService } from './firebase.service';
import { Subscription } from 'rxjs';
import { MachineParkService } from './machine-park.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnDestroy {

  employeeLists: Employee[] = [];
  private employeeListSubscription: Subscription;
  isInEditMode: boolean = false;

  constructor(private firebaseService: FirebaseService, private machineService: MachineParkService) { 
    this.employeeListSubscription = this.firebaseService.employeesList$.subscribe((employees)=>{
      this.employeeLists = employees
    })
  }

  ngOnDestroy(): void {
  this.employeeListSubscription.unsubscribe();
  }


  getEmployees(): Employee[] {
    return this.employeeLists;
  }

  addEmployee(employee: Employee) {
    this.employeeLists.push(employee);
    this.firebaseService.addEmployee(employee);
  }

  getEployeeByAssignedMachine(machineId: string): Employee [] {
    return this.employeeLists.filter(employee => employee.activeMachine === machineId) || {} as Employee;
  }

  getMachineName(machineId: string) {
    if(machineId === 'none') {
      return 'none';
    } else {
    return this.machineService.machineList.find((machine) => machine.id === machineId)?.name;
    }
   }

  updateEmployee(employee: Employee) {
    const index = this.employeeLists.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
      this.employeeLists[index] = employee;
      this.firebaseService.updateEmployee(employee.id, employee);
    } else {
      console.error('Employee not found');
    }
  }

  deleteEmployee(employee: Employee) {
    this.firebaseService.deleteEmployee(employee.id);
  }
}
