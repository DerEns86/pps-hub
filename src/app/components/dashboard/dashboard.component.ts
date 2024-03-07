import { Component , OnInit, OnDestroy} from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{

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
}