import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ProjectsService } from '../../../services/projects.service';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../interfaces/employee';

@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-add-employee.component.html',
  styleUrl: './dialog-add-employee.component.scss'
})
export class DialogAddEmployeeComponent implements OnInit {

  employee: Employee = {} as Employee;

  constructor(public dialogRef: MatDialogRef<DialogAddEmployeeComponent>,
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
