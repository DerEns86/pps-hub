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
    if(status === 'all') {
      return this.projectList;
    }
    return this.projectList.filter(project => project.status === status);
  }

   filterProjectsByMachine(machineNo: string): Project[] {
    const sortedList = this.sortProjectsByDate();
    return sortedList
      .filter(project => project.usedMachine === machineNo)
      .map(project => project.projectId);
  }

  sortProjectsByDate() {
    return this.projectList.sort((a, b) => a.deliveryDate - b.deliveryDate);
  }

  changeStatus(project: Project, newStatus: 'active' | 'paused' | 'finished' | 'awaiting') {
    project.status = newStatus;
    if (project.id) {
      this.firebase.updateProject(project.id, project);
    }
  }

  calcSheduledTimePerMachine(machineNo: string) {
    const projects = this.projectList.filter(project => project.usedMachine === machineNo);
    let scheduledTime = 0;
    projects.forEach(project => {
      scheduledTime += Number(project.scheduledTime);
    });
    return scheduledTime;
  }

   addProject(project: Project) {
    this.projectList.push(project);
    this.firebase.addProject(project);
  }

  deleteProject(Id: string) {
    this.firebase.deleteProject(Id);
  }

  updateProject(projectId: string, project: Project) {
    this.firebase.updateProject(projectId, project);
  }

}
