import { Component , OnInit, OnDestroy} from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project';
import { FirebaseService } from '../../services/firebase.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { MachineParkService } from '../../services/machine-park.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{

// activeProjects: Project[] = [];
currentFilter: string = 'active';
constructor(private projectService: ProjectsService, 
private machineService: MachineParkService,
private employeeService: EmployeeService
  ) {}
 
  ngOnInit(): void {
     this.getProjectList();
  }

  ngOnDestroy(): void {
   
  }

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

  setListFilter(status : string) {
    if (status === 'all') {
      this.currentFilter = status;
      return this.projectService.projectList;
    }else {
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


  getEmployeeList(){
    return this.employeeService.getEmployees();
  }
  
}