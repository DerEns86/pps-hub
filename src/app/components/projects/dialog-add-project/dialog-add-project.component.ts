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

  
  projectList = this.projectService.projectList;
  project: Project = {} as Project;
  
  constructor(public projectService: ProjectsService,
     public dialogRef: MatDialogRef<DialogAddProjectComponent>) { }


  addProject() {
    
    this.project.deliveryDate = new Date(this.project.deliveryDate).getTime();
    console.log(this.project);
    this.project.status = 'awaiting';
    
    this.projectService.addProject(this.project);

    
  }
  closeDialog() {
    this.projectService.editMode = false;
    this.dialogRef.close();
  }

 
}
