import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { MachineParkService } from '../../services/machine-park.service';
import { EmployeeService } from '../../services/employee.service';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { Machine } from '../../interfaces/machine';
import { MatOption } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: true,
    imports: [ProjectCardComponent, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatSelect, FormsModule, MatOption]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private projectService = inject(ProjectsService)
  private machineService = inject(MachineParkService)
  private employeeService = inject(EmployeeService)

  currentFilter: string = 'active';
  constructor() {}

  ngOnInit(): void {
    this.getProjectList();
  }

  ngOnDestroy(): void { }

  getProjectList() {
    return this.projectService.projectList;
  }

  getMachineList() {
    return this.machineService.machineList;
  }

  formatDate(date: number) {
    return new Date(date).toLocaleDateString('de-DE');
  }

  getActiveProjects() {
    return this.projectService.filterProjects('active');
  }

  getAwaitingProjects() {
    return this.projectService.filterProjects('awaiting');
  }

  getPausedProjects() {
    return this.projectService.filterProjects('paused');
  }

  getFinishedProjects() {
    return this.projectService.filterProjects('finished');
  }

  setListFilter(status: string) {
    if (status === 'all') {
      this.currentFilter = status;
      return this.projectService.projectList;
    } else {
      this.currentFilter = status;
      return this.projectService.filterProjects(status);
    }
  }

  getProjectsForMachine(machineNo: string) {
    return this.projectService.filterProjectsByMachine(machineNo);
  }

  getSheduledTimePerMachine(machineNo: string) {
    return this.projectService.calcSheduledTimePerMachine(machineNo);
  }

  getEmployeeList() {
    return this.employeeService.employeeLists;
  }

  onSelectionChange(event: MatSelectChange, machineId: string, machine: Machine) {
    this.machineService.updateMachine(machineId, { ...machine, assignedEmployee: event.value });
  }

  getUnassignedEmployees() {
    return this.employeeService.getUnassignedEmployees();
  }
}