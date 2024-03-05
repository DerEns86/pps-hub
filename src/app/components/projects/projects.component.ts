import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/projects.class';
import { Subscription } from 'rxjs';

import { DialogAddProjectComponent } from './dialog-add-project/dialog-add-project.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  // allProjects: Project[] = [];
  private projectListSubscription: Subscription | undefined;

  

  constructor(private projectService: ProjectsService, public dialog: MatDialog) {
    // this.allProjects = this.projectService.projectList;
  }

  ngOnInit(): void {
  //  this.projectService.projectList$.subscribe((projects) => {
  //     this.allProjects = projects;
  //   });
  }
ngOnDestroy(): void {
  // if (this.projectListSubscription) {
  //   this.projectListSubscription.unsubscribe();
  // }
}

getProjectList() {
  return this.projectService.projectList;
}

formatDate(date: number) {
  return new Date(date).toLocaleDateString('de-DE');
}

  openAddDialog() {
    this.dialog.open(DialogAddProjectComponent);
  }

  openEditDialog( project: Project) {
    this.projectService.editMode = true;
    let dialog = this.dialog.open(DialogAddProjectComponent);
    dialog.componentInstance.project = project;
    
  }

  deleteProject(Id: string) {
    this.projectService.deleteProject(Id);
    // let docId = this.projectService.projectList[projectId].id;
    // console.log('delete project with id: ' + projectId);
    console.log('delete project with docId: ' + Id);
  }



}
