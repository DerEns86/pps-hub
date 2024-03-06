import { Injectable, OnDestroy, inject } from '@angular/core';
import { Project } from '../interfaces/project';
import { FirebaseService } from './firebase.service';
import { onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ProjectsService implements OnDestroy {


  projectList: any[] = [];
  editMode = false;
  
  constructor(private firebase: FirebaseService) { 


  }

  ngOnDestroy() {
  }

   /**
   * Listens for changes in the projects collection and updates the project list accordingly.
   * @returns A function to unsubscribe from the projects list.
   */
  // snapShotProjectsList() {
  //   return onSnapshot(this.firebase.getProjectsRef(), (querySnapshot) => {
  //     this.projectList = [];
  //      querySnapshot.forEach((doc) => {
  //        this.projectList.push({
  //          id: doc.id,
  //          ...doc.data()
  //        });
  //        console.log(doc.id, " => ", doc.data());
  //        console.log(this.projectList);
  //      });
  //    });
  //  }


  loadStorage() { //just for testing #########################
    let storage = localStorage.getItem('projects');
    if (storage){
      this.projectList = JSON.parse(storage);
      console.log(this.projectList);
    }
  }


   /**
    * add a project to the firebase, parsed as a json object
    * @param project // the project to be added
    */
   addProject(project: Project) {
    this.projectList.push(project);
    localStorage.setItem('projects', JSON.stringify(this.projectList));  //just for testing #########################
  }

  /**
   * delete a project from the firebase
   * @param projectId // the id of the project to be deleted
   */
  deleteProject(projectId: string) {
    // this.firebase.deleteProject(projectId);
  }

  /**
   * update a project in the firebase
   * @param projectId // the id of the project to be updated
   * @param project // the updated project
   */
  updateProject(projectId: string, project: Project) {
    // this.firebase.updateProject(projectId, project.toJson());
  }

}
