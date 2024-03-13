import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project';
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


  

  constructor(private projectService: ProjectsService, public dialog: MatDialog) {
  
  }

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

  openAddDialog() {
    this.dialog.open(DialogAddProjectComponent);
  }

  openEditDialog( project: Project) {
    this.projectService.editMode = true;
    let dialog = this.dialog.open(DialogAddProjectComponent);
    // dialog.componentInstance.project = project;
    
  }

  deleteProject(Id: string) {
    this.projectService.deleteProject(Id);
    console.log('delete project with docId: ' + Id);
  }


  getMachineName(machineNo: string) {
    if (machineNo === 'one'){
      return 'Multus B300W';
    } else if (machineNo === 'two') {
      return 'M400B';
    }else if (machineNo === 'three') {
      return 'GTX500A';
    } else {
      return 'not assigned yet';
    }
  }


}
