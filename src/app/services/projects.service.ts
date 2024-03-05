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
  editMode = false;
  
  constructor(private firebase: FirebaseService) { 

    this.unsubProjectsList = this.snapShotProjectsList();

  }

  ngOnDestroy() {
   this.unsubProjectsList();
  }

   /**
   * Listens for changes in the projects collection and updates the project list accordingly.
   * @returns A function to unsubscribe from the projects list.
   */
  snapShotProjectsList() {
    return onSnapshot(this.firebase.getProjectsRef(), (querySnapshot) => {
      this.projectList = [];
       querySnapshot.forEach((doc) => {
         this.projectList.push({
           id: doc.id,
           ...doc.data()
         });
         console.log(doc.id, " => ", doc.data());
         console.log(this.projectList);
       });
     });
   }


   /**
    * add a project to the firebase, parsed as a json object
    * @param project // the project to be added
    */
  addProject(project: Project) {
    this.firebase.addProject(project.toJson());
  }

  /**
   * delete a project from the firebase
   * @param projectId // the id of the project to be deleted
   */
  deleteProject(projectId: string) {
    this.firebase.deleteProject(projectId);
  }

  /**
   * update a project in the firebase
   * @param projectId // the id of the project to be updated
   * @param project // the updated project
   */
  updateProject(projectId: string, project: Project) {
    this.firebase.updateProject(projectId, project.toJson());
  }

}
