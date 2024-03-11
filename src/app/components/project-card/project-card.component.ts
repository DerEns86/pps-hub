import { Component, Input} from '@angular/core';
import { Project } from '../../interfaces/project';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})


export class ProjectCardComponent {

  @Input() project: Project | undefined;

constructor(private projectService: ProjectsService) {}




  
      
  
}
