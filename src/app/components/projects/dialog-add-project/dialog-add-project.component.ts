import { Component } from '@angular/core';
import { Project } from '../../../models/projects.class';
import { ProjectsService } from '../../../services/projects.service';
import { CommonModule } from '@angular/common';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrl: './dialog-add-project.component.scss'
})
export class DialogAddProjectComponent {

  project: Project = new Project(0, '', '', 0, 0, [], 'awaiting', '');
  constructor(private projectService: ProjectsService,
     public dialogRef: MatDialogRef<DialogAddProjectComponent>) { }


  addProject() {
    this.projectService.addProject(this.project);
    this.project.deliveryDate = new Date(this.project.deliveryDate).getTime();
    console.log(this.project);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
