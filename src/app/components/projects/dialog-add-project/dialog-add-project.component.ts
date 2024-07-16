import { Component, OnInit } from '@angular/core';
import { Project } from '../../../interfaces/project';
import { ProjectsService } from '../../../services/projects.service';
import { CommonModule } from '@angular/common';
import {  MatDialogRef } from '@angular/material/dialog';
import { Machine } from '../../../interfaces/machine';
import { MachineParkService } from '../../../services/machine-park.service';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrl: './dialog-add-project.component.scss'
})
export class DialogAddProjectComponent implements OnInit{

  machineList: Machine[] = [];
  projectList = this.projectService.projectList;
  project: Project = {} as Project;
  
  constructor(public projectService: ProjectsService,
    public machineParkService: MachineParkService,
     public dialogRef: MatDialogRef<DialogAddProjectComponent>) { }


  ngOnInit(): void {
    this.machineList = this.machineParkService.getMachineList();
  }
    
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

  getMachineList(){
    return this.machineParkService.getMachineList();
  }

 
}
