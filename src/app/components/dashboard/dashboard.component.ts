import { Component , OnInit, OnDestroy} from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project';
import { FirebaseService } from '../../services/firebase.service';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{

// activeProjects: Project[] = [];
currentFilter: string = '';
constructor(private projectService: ProjectsService, private firebase: FirebaseService) {}
 
  ngOnInit(): void {
     this.getProjectList();
    
  }

  ngOnDestroy(): void {
   
  }

  getProjectList() {
    return this.projectService.projectList;
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

  
}