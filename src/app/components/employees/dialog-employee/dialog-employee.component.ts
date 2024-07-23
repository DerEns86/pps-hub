import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MachineParkService } from '../../../services/machine-park.service';
import { Machine } from '../../../interfaces/machine';
import { ProjectsService } from '../../../services/projects.service';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../interfaces/employee';

@Component({
  selector: 'app-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrl: './dialog-employee.component.scss'
})
export class DialogEmployeeComponent implements OnInit {

  employee: Employee = {} as Employee;

  constructor(public dialogRef: MatDialogRef<DialogEmployeeComponent>,
    private projectService: ProjectsService,
    private employeeService: EmployeeService) {

  }

 ngOnInit(): void {
   
  }
 
  saveEmployee() {
    console.log(this.employee);
    this.employee.activeMachine = 0;
    this.employeeService.addEmployee(this.employee);
    this.dialogRef.close();
  }

  cloeDialog() {
    this.dialogRef.close();
  }
}
