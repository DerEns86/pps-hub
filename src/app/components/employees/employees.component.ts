import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.class';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})


export class EmployeesComponent implements OnInit {

  allEmployees: Employee[] = [];

  constructor(private employee: EmployeeService) { }

  ngOnInit(): void {
    this.allEmployees = this.employee.getEmployees();
    console.log('component: ', this.allEmployees);
  }
}
