import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Project } from '../models/projects.class';

import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root'
})


// employeeList: Employee[] = [];
// machineList: Machine[] = [];
export class FirebaseService implements OnDestroy {

  projectList: Project[] = [];

 
  firebase: Firestore = inject(Firestore);

  constructor() {
  
  }


  ngOnDestroy() {

  }
  getProjects() {
    return collection(this.firebase, 'projects');
  }

  getEmployees() {
    return collection(this.firebase, 'employees');
  }

  getProjectList(): Project[] {
    return this.projectList;
  }

  async addProject(item: Project) {
    await addDoc(this.getProjects(), item);
  }
}
