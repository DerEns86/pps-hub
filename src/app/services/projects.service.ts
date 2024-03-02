import { Injectable } from '@angular/core';
import { Project } from '../models/projects.class';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = [];
  constructor() { 
    this.projects.push(new Project(1, 'Hydrogen', 'Articel1', new Date(1709292697711), 8, ['Machine1', 'Machine2'], 'awaiting', `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`));
    this.projects.push(new Project(2, 'Helium', 'Articel2', new Date(1709292697711), 8, ['Machine1', 'Machine2'], 'awaiting', `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`));
  }

  getProjects(): Project[] {
    return this.projects;
  }
}
