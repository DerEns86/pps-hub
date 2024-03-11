import { Component, Input } from '@angular/core';
import { Project } from '../../interfaces/project';
import { ProjectsService } from '../../services/projects.service';


@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})


export class ProjectCardComponent {

  @Input() project: Project | undefined;

  constructor(private projectService: ProjectsService) { }

  changeStatusToActive(){
    if (this.project) {
      this.projectService.changeStatus(this.project, 'active');
    }
  }

  changeStatusToPaused() {
    if (this.project) {
      this.projectService.changeStatus(this.project, 'paused');
    }
  }

  changeStatusToFinished() {
    if (this.project) {
      this.projectService.changeStatus(this.project, 'finished');
    }
  }

  openProjectDetails(){
    if (this.project) {
      // this.projectService.openProjectInfo(this.project);
    }
  }

  openProjectEdit(){

  }



  formatDate(timestamp: any) {
    return new Date(timestamp).toLocaleDateString();
  }
}
