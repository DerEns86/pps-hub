import { Injectable, OnDestroy, inject } from '@angular/core';
import { Project } from '../models/projects.class';
import { FirebaseService } from './firebase.service';
import { onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ProjectsService implements OnDestroy {

  private _projectList = new BehaviorSubject<Project[]>([]);
  projectList$ = this._projectList.asObservable();
  unsubProjectsList: () => void;
  
  constructor(private firebase: FirebaseService) { 

    this.unsubProjectsList = this.snapProjectsList();

  }

  ngOnDestroy() {
   this.unsubProjectsList();
  }

  snapProjectsList() {
    return onSnapshot(this.firebase.getProjects(), (querySnapshot) => {
      const projects: Project[] = [];
      querySnapshot.forEach((doc) => {
        projects.push(doc.data() as Project);
      });
      this._projectList.next(projects);
    });
  }

}
