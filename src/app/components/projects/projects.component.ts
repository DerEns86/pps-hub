import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/projects.class';

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
export class ProjectsComponent implements OnInit {
  allProjects: Project[] = [];
  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.allProjects = this.projectService.getProjects();
  }


  openDialog(project: Project) {
    // this.dialog.open(ProjectDialogComponent, {});
  }

  deleteProject(projectId: number) {
    // this.projectService.deleteProject(project.projectId);
  }

}
