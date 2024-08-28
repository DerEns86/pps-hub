import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ProjectsService } from '../../../services/projects.service';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../interfaces/employee';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-add-employee.component.html',
  styleUrl: './dialog-add-employee.component.scss'
})
export class DialogAddEmployeeComponent implements OnInit {

  @Input() employee: any; // Assuming employee is passed as an input
  employeeForm: FormGroup;
  skillList: string[] = ['Mill', 'Turn', 'Mill-Turn'];
  skills: FormGroup<any> = new FormGroup([]);

  constructor(public dialogRef: MatDialogRef<DialogAddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private fb: FormBuilder,
    private employeeService: EmployeeService) {

    this.employee = data || {} as Employee;
    this.employeeForm = this.fb.group({
      employeeId: [this.employee.employeeId ?? ''],
      name: [this.employee.name ?? ''],
      surname: [this.employee.surname ?? ''],
      email: [this.employee.skills ?? ''],
      skills: [this.employee.skills ?? []],
    })
  }

  ngOnInit(): void {
    console.log("Loaded Employee: ", this.employee);


    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }

  }

  saveEmployee() {
    if (!this.employeeService.isInEditMode) {
      this.employee = this.employeeForm.value;
      this.employee.activeMachine = 0;
      this.employeeService.addEmployee(this.employee);
      console.log(this.employee);
    } else {
      console.log("Update Employee");
      this.updateEmployee();
    }
    this.dialogRef.close();

  }

  updateEmployee() {
    const updatedEmployee = { ...this.employee, ...this.employeeForm.value };
    console.log('UpdatedUser from Dialog', updatedEmployee);
    this.employeeService.updateEmployee(updatedEmployee);
  }


  cloeDialog() {
    this.dialogRef.close();
  }
}
