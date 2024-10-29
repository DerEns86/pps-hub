import { Component, Inject, Input, OnInit } from '@angular/core';
import { Project } from '../../../interfaces/project';
import { ProjectsService } from '../../../services/projects.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { Machine } from '../../../interfaces/machine';
import { MachineParkService } from '../../../services/machine-park.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepickerToggleIcon, MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';

@Component({
    selector: 'app-dialog-add-project',
    templateUrl: './dialog-add-project.component.html',
    styleUrl: './dialog-add-project.component.scss',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatIcon, MatDatepickerToggleIcon, MatDatepicker, MatSelect, MatOption, MatDialogActions, MatButton]
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
    this.projectService.editMode = false;
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
