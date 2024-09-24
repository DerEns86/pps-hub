import { Component, Inject, Input, OnInit } from '@angular/core';
import { Project } from '../../../interfaces/project';
import { ProjectsService } from '../../../services/projects.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Machine } from '../../../interfaces/machine';
import { MachineParkService } from '../../../services/machine-park.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrl: './dialog-add-project.component.scss'
})
export class DialogAddProjectComponent implements OnInit {

  @Input() project: Project;
  projectForm: FormGroup

  machineList: Machine[] = [];
  projectList = this.projectService.projectList;
  // project: Project = {} as Project;

  constructor(public projectService: ProjectsService,
    public machineParkService: MachineParkService,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddProjectComponent>) {

    this.project = data || {} as Project;
    this.projectForm = this.fb.group({
      projectId: [this.project.projectId ?? ''],
      customer: [this.project.customer ?? ''],
      article: [this.project.article ?? ''],
      deliveryDate: [this.project.deliveryDate ?? ''],
      scheduledTime: [this.project.scheduledTime ?? ''],
      usedMachine: [this.project.usedMachine ?? ''],
      notification: [this.project.notification ?? ''],
    })
  }


  ngOnInit(): void {
    this.machineList = this.machineParkService.getMachineList();

    if (this.project) {
      this.projectForm.patchValue(this.project);
    }
  }

  addProject() {
    if (!this.projectService.editMode) {
      this.project = this.projectForm.value
      this.project.deliveryDate = this.project.deliveryDate.valueOf();
      this.project.status = 'awaiting';

      this.projectService.addProject(this.project);
    } else {
      console.log("projectId: ", this.project.id)
      if (this.project.id) {
        this.project.deliveryDate = this.project.deliveryDate.valueOf();
     
        const updatedProject = {
          ...this.project,
          ...this.projectForm.value,
          deliveryDate: new Date(this.projectForm.value.deliveryDate).valueOf()
        };
        this.projectService.updateProject(this.project.id, updatedProject)
      } else {
        console.error('No projectId found')
      }
    }
    this.dialogRef.close();

  }
  closeDialog() {
    this.projectService.editMode = false;
    this.dialogRef.close();
  }

  getMachineList() {
    return this.machineParkService.getMachineList();
  }


}
