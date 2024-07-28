import { Injectable, OnDestroy } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { FirebaseService } from './firebase.service';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnDestroy {

  employeeLists: Employee[] = [];
  private employeeListSubscription: Subscription;

  constructor(private firebaseService: FirebaseService) { 
    this.employeeListSubscription = this.firebaseService.employeesList$.subscribe((employees)=>{
      this.employeeLists = employees
    })
  }

  ngOnDestroy(): void {
  this.employeeListSubscription.unsubscribe();
  }


  getEmployees(): Employee[] {
    console.log('service: ',this.employeeLists);
    return this.employeeLists;
  }

  addEmployee(employee: Employee) {
    this.employeeLists.push(employee);
    this.firebaseService.addEmployee(employee);
  }

  getEployeeByAssignedMachine(machineId: number): Employee [] {
    return this.employeeLists.filter(employee => employee.activeMachine === machineId) || {} as Employee;
  }
}
