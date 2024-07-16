import { Component, OnInit, inject } from '@angular/core';

import { DialogEmployeeComponent } from './dialog-employee/dialog-employee.component';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})


export class EmployeesComponent implements OnInit {

  allEmployees: Employee[] = [];

  constructor(private employee: EmployeeService, public Dialog: MatDialog) { }

  ngOnInit(): void {
    this.allEmployees = this.employee.getEmployees();
    console.log('component: ', this.allEmployees);
  }

  openAddDialog() {
    this.Dialog.open(DialogEmployeeComponent);
  }
}
