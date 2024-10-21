import { Component, Input, inject } from '@angular/core';
import { Project } from '../../interfaces/project';
import { ProjectsService } from '../../services/projects.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';


@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrl: './project-card.component.scss',
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatIconButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, MatCardContent]
})


export class ProjectCardComponent {

  private projectService = inject(ProjectsService);

  @Input() project: Project | undefined;

  constructor() { }

  changeStatusToActive() {
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

  openProjectDetails() {
    if (this.project) {
      // this.projectService.openProjectInfo(this.project);
    }
  }

  openProjectEdit() {

  }

  formatDate(timestamp: any) {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
    return new Date(timestamp).toLocaleDateString('de-DE', options);
  }
}
