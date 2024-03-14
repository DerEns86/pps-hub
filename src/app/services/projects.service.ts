import { Injectable, OnDestroy, inject } from '@angular/core';
import { Project } from '../interfaces/project';
import { FirebaseService } from './firebase.service';
import { onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class ProjectsService implements OnDestroy {


  projectList: any[] = [];
  activeProjects: any[] = [];
  private projectListSubscription: Subscription;

  editMode = false;
  
  constructor(private firebase: FirebaseService) { 
    
    this.projectListSubscription = this.firebase.projectList$.subscribe((projects) => {
    this.projectList = projects;
      this.activeProjects = this.filterProjects('active');
      });
    
  }

  ngOnDestroy() {

    this.projectListSubscription.unsubscribe();
  }

   

 getProjectList() {
    return this.projectList;
  }

  filterProjects(status: string) {
    return this.projectList.filter(project => project.status === status);
  }

  filterProjectsByMachine(machineNo: string) {
    return this.projectList.filter(project => project.usedMachines === machineNo);
  }

  changeStatus(project: Project, newStatus: 'active' | 'paused' | 'finished' | 'awaiting') 
  { // Fix the type declaration
    project.status = newStatus;
    if (project.id) {
      this.firebase.updateProject(project.id, project);
    }
  }

  calcSheduledTimePerMachine(machineNo: string) {
    const projects = this.filterProjectsByMachine(machineNo);
    let scheduledTime = 0;
    projects.forEach(project => {
      scheduledTime += Number(project.scheduledTime);
    });
    return scheduledTime;
  }

   /**
    * add a project to the firebase, parsed as a json object
    * @param project // the project to be added
    */
   addProject(project: Project) {
    this.projectList.push(project);
    this.firebase.addProject(project);
    // localStorage.setItem('projects', JSON.stringify(this.projectList));  //just for testing #########################
  }

  /**
   * delete a project from the firebase
   * @param projectId // the id of the project to be deleted
   */
  deleteProject(Id: string) {
    this.firebase.deleteProject(Id);
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
