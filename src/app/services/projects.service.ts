import { Injectable, OnDestroy, inject } from '@angular/core';
import { Project } from '../models/projects.class';
import { FirebaseService } from './firebase.service';
import { onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ProjectsService implements OnDestroy {

  // private _projectList = new BehaviorSubject<Project[]>([]);
  // projectList$ = this._projectList.asObservable();
  unsubProjectsList: () => void;
  projectList: any[] = [];
  constructor(private firebase: FirebaseService) { 

    this.unsubProjectsList = this.snapShotProjectsList();

  }

  ngOnDestroy() {
   this.unsubProjectsList();
  }

  snapShotProjectsList() {
    return onSnapshot(this.firebase.getProjectsRef(), (querySnapshot) => {
      this.projectList = [];
       querySnapshot.forEach((doc) => {
         this.projectList.push({
           id: doc.id,
           ...doc.data()
         });
         console.log(doc.id, " => ", doc.data());
       });
     });
   }

  addProject(project: Project) {
    this.firebase.addProject(project.toJson());
  }

}
