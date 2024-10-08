import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../interfaces/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-add-employee.component.html',
  styleUrl: './dialog-add-employee.component.scss'
})
export class DialogAddEmployeeComponent implements OnInit {

  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);

  @Input() employee: any;
  employeeForm: FormGroup;
  skillList: string[] = ['Mill', 'Turn', 'Mill-Turn'];
  skills: FormGroup<any> = new FormGroup([]);

  constructor(public dialogRef: MatDialogRef<DialogAddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {

    this.employee = data || {} as Employee;
    this.employeeForm = this.fb.group({
      employeeId: [this.employee.employeeId ?? ''],
      name: [this.employee.name ?? ''],
      surname: [this.employee.surname ?? ''],
      email: [this.employee.skills ?? '', Validators.email],
      skills: [this.employee.skills ?? []],
    })
  }

  ngOnInit(): void {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  saveEmployee() {
    if (!this.employeeService.isInEditMode) {
      this.employee = this.employeeForm.value;
      this.employee.activeMachine = "none";
      this.employeeService.addEmployee(this.employee);
    } else {
      this.updateEmployee();
    }
    this.employeeService.isInEditMode = false;
    this.dialogRef.close();
  }

  updateEmployee() {
    const updatedEmployee = { ...this.employee, ...this.employeeForm.value };
    this.employeeService.updateEmployee(updatedEmployee);
  }

  cloeDialog() {
    this.dialogRef.close();
  }
}
