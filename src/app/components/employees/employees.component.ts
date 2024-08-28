import { Component, OnInit, inject } from '@angular/core';

import { DialogAddEmployeeComponent } from './dialog-add-employee/dialog-add-employee.component';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})


export class EmployeesComponent implements OnInit {

 

  constructor(private employeeService: EmployeeService, public Dialog: MatDialog) { }

  ngOnInit(): void {
    this.employeeService.getEmployees();
    
  }

  getEmployeesList(){
   return this.employeeService.employeeLists;
  }

  openAddDialog() {
    this.Dialog.open(DialogAddEmployeeComponent);
  }

  editEmployee(employee: Employee){
    this.employeeService.isInEditMode = true;
    console.log(employee)
    this.Dialog.open(DialogAddEmployeeComponent, {data: employee})
  }
}
