import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project';
import { Subscription } from 'rxjs';

import { DialogAddProjectComponent } from './dialog-add-project/dialog-add-project.component';
import { MatDialog } from '@angular/material/dialog';
import { MachineParkService } from '../../services/machine-park.service';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';

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
    standalone: true,
    imports: [
        MatButton,
        MatTabGroup,
        MatTab,
    ],
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private projectService = inject(ProjectsService)
  private machineService = inject(MachineParkService)

  displayedColumns: string[] = ['No', 'Customer', 'Article', 'Delivery Date', 'Sheduled Time', 'Status', 'Used Machines']

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  getProjectList() {
    return this.projectService.getProjectList();
  }

  getFilteredProjects(status: string) {
    return this.projectService.filterProjects(status);
  }

  formatDate(date: number) {
    return new Date(date).toLocaleDateString('de-DE');
  }

  openAddDialog() {
    this.dialog.open(DialogAddProjectComponent);
  }

  openEditDialog(project: Project) {
    this.projectService.editMode = true;
    const deliveryDate = new Date(project.deliveryDate);
    this.dialog.open(DialogAddProjectComponent, { data: { ...project, deliveryDate } });
  }

  deleteProject(Id: string) {
    this.projectService.deleteProject(Id);
    console.log('delete project with docId: ' + Id);
  }

  getMachineName(machineId: string) {
    return this.machineService.machineList.find((machine) => machine.id === machineId)?.name;
  }

}
