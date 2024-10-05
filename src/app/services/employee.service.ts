import { inject, Injectable, OnDestroy } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { FirebaseService } from './firebase.service';
import { Subscription } from 'rxjs';
import { MachineParkService } from './machine-park.service';
import { SnackbarService } from './snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnDestroy {

  employeeLists: Employee[] = [];
  private employeeListSubscription: Subscription;
  isInEditMode: boolean = false;

  private snackbarService = inject(SnackbarService);
  private firebaseService = inject(FirebaseService);
  private machineService = inject(MachineParkService);

  constructor() {
    this.employeeListSubscription = this.firebaseService.employeesList$.subscribe((employees) => {
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
    try {
      this.firebaseService.addEmployee(employee);
      this.snackbarService.openSnackBar('Employee added', 'success-snackbar');
    } catch {
      this.snackbarService.openSnackBar('Something went wrong, please try again', 'error-snackbar');
    }
  }

  getEployeeByAssignedMachine(machineId: string): Employee[] {
    return this.employeeLists.filter(employee => employee.activeMachine === machineId) || {} as Employee;
  }

  getUnassignedEmployees(): Employee[] {
    const assignedEmployeeIds = this.firebaseService.machinesList
      .filter(machine => machine.assignedEmployee)
      .map(machine => machine.assignedEmployee);

    const unassignedEmployees = this.firebaseService.employeesList.filter(employee => !assignedEmployeeIds.includes(employee.id));

    return unassignedEmployees;
  }

  getMachineName(machineId: string) {
    if (machineId === 'none') {
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
      this.snackbarService.openSnackBar('Employee updated', 'custom-snackbar');
    } else {
      console.error('Employee not found');
      this.snackbarService.openSnackBar('Employee not found', 'error-snackbar');
    }
  }

  deleteEmployee(employee: Employee) {
    this.firebaseService.deleteEmployee(employee.id);
    this.snackbarService.openSnackBar('Employee deleted', 'custom-snackbar');
  }
}
