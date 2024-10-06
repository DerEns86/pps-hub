import { Injectable, OnDestroy, inject } from '@angular/core';
import { Project } from '../interfaces/project';
import { FirebaseService } from './firebase.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from './snackbar.service';


@Injectable({
  providedIn: 'root'
})

export class ProjectsService implements OnDestroy {

  private firebase = inject(FirebaseService);
  private snackbarService = inject(SnackbarService);

  public projectList: any[] = [];
  public activeProjects: any[] = [];
  private projectListSubscription: Subscription;
  public editMode = false;

  constructor() {

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
    if (status === 'all') {
      return this.projectList;
    }
    return this.projectList.filter(project => project.status === status);
  }

  filterProjectsByMachine(machineNo: string): Project[] {
    const sortedList = this.sortProjectsByDate();
    return sortedList
      .filter(project => project.usedMachine === machineNo)
      .map(project => project);
  }

  sortProjectsByDate() {
    return this.projectList.sort((a, b) => a.deliveryDate - b.deliveryDate);
  }

  changeStatus(project: Project, newStatus: 'active' | 'paused' | 'finished' | 'awaiting') {
    project.status = newStatus;
    if (project.id) {
      try {
        this.firebase.updateProject(project.id, project);
        this.snackbarService.openSnackBar('Status changed', 'custom-snackbar');
      } catch (error) {
        console.error(error);
        this.snackbarService.openSnackBar('Something went wrong. Please try again later', 'error-snackbar')
      }
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
    try {
      this.projectList.push(project);
      this.firebase.addProject(project);
      this.snackbarService.openSnackBar('Product added', 'success-snackabr');
    } catch (error) {
      console.error(error);
      this.snackbarService.openSnackBar('Something went wrong. Please try again later', 'error-snackbar')
    }
  }

  deleteProject(Id: string) {
    try {
      this.firebase.deleteProject(Id);
      this.snackbarService.openSnackBar('Project deleted', 'success-snackbar');
    } catch (error) {
      console.error(error);
      this.snackbarService.openSnackBar('Something went wrong. Please try again later', 'error-snackbar')
    }
  }

  updateProject(projectId: string, project: Project) {
    try {
      this.firebase.updateProject(projectId, project);
      this.snackbarService.openSnackBar('Project updated', 'custom-snackbar');
    } catch (error) {
      console.error(error);
      this.snackbarService.openSnackBar('Something went wrong. Please try again later', 'error-snackbar')
    }
  }
}
