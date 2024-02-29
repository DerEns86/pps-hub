import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.class';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[] = [];

  constructor() { 
    this.employees.push(new Employee(1, 'John', 'Doe', 'john.doe@example.com', 'pass1', ['mill'], 3));
    this.employees.push(new Employee(2, 'Jane', 'Smith', 'jane.smith@example.com', 'pass2', ['turn'], 5));
    this.employees.push(new Employee(3, 'Alice', 'Johnson', 'alice.johnson@example.com', 'pass3', ['mill', 'turn'], 7));
    this.employees.push(new Employee(4, 'Bob', 'Williams', 'bob.williams@example.com', 'pass4', ['saw'], 6));
   
  }


  getEmployees(): Employee[] {
    console.log('service: ',this.employees);
    return this.employees;
  }
}
