import { Component } from '@angular/core';
import { Project } from '../../../interfaces/project';
import { ProjectsService } from '../../../services/projects.service';
import { CommonModule } from '@angular/common';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrl: './dialog-add-project.component.scss'
})
export class DialogAddProjectComponent {

  // editMode = false;
  projectList: Project[] = [];
  // project: Project = new Project(0, '', '', 0, 0, [], 'awaiting', '');
  constructor(public projectService: ProjectsService,
     public dialogRef: MatDialogRef<DialogAddProjectComponent>) { }


  addProject() {
    // this.projectService.addProject(this.project);
    // this.project.deliveryDate = new Date(this.project.deliveryDate).getTime();
    // console.log(this.project);
    this.projectList.push({
      
      id: 'test',
      projectId: 123,
      customer: 'test',
      article: 'test',
      deliveryDate: new Date().getTime(),
      status: 'awaiting',
      notification: 'test',
      scheduledTime: 8,
      usedMachines: ['test']

    
    });

    console.log(this.projectList);
  }
  closeDialog() {
    this.projectService.editMode = false;
    this.dialogRef.close();
  }

  test() {
    // console.log('test: ', this.project);
  }
}
