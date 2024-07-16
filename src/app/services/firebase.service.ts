import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Project } from '../interfaces/project';
import { BehaviorSubject } from 'rxjs';
import { Machine } from '../interfaces/machine';


@Injectable({
  providedIn: 'root'
})



export class FirebaseService implements OnDestroy {

  projectList: Project[] = [];
  machinesList: Machine[] = [];

  projectList$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(this.projectList);
  MachinesList$: BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>(this.machinesList);

  unsubProjectsSnapshot;
  unsubMachinesSnapshot;
  firebase: Firestore = inject(Firestore);

  constructor() {
    this.unsubProjectsSnapshot = this.snapShotProjectsList();
    this.unsubMachinesSnapshot = this.snapShotMachinesList();
  }


  snapShotProjectsList() {
    return onSnapshot(this.getProjectsRef(), (querySnapshot) => {
      this.projectList = [];
      querySnapshot.forEach((doc) => {
        const projectData = doc.data() as Project;
        projectData.id = doc.id;
        this.projectList.push(projectData);
      });
      this.projectList$.next(this.projectList);
      console.log(this.projectList);
    });
  }


  snapShotMachinesList() {
    return onSnapshot(this.getMachinesRef(), (querySnapshot) => {
      this.machinesList = [];
      querySnapshot.forEach((doc) => {
        const machineData = doc.data() as Machine;
        machineData.id = doc.id;
        this.machinesList.push(machineData);
      });
      this.MachinesList$.next(this.machinesList);
      console.log('machineList', this.machinesList);
    });
  }




  ngOnDestroy() {
    this.unsubProjectsSnapshot();
    this.unsubMachinesSnapshot();
  }
  getProjectsRef() {
    return collection(this.firebase, 'projects');
  }

  getEmployeesRef() {
    return collection(this.firebase, 'employees');
  }

  getProjectList(): Project[] {
    return this.projectList;
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firebase, colId), docId);
  }

  async addProject(item: {}) {
    await addDoc(this.getProjectsRef(), item);
  }

  async deleteProject(docId: string) {
    await deleteDoc(this.getSingleDocRef('projects', docId));
  }

  async updateProject(docId: string, item: {}) {
    await updateDoc(this.getSingleDocRef('projects', docId), item);
  }

  async addMachines(item: {}) {
    await addDoc(this.getMachinesRef(), item);
  }

  getMachinesRef() {
    return collection(this.firebase, 'machines');
  }

  async addEmployee(item: {}) {
    await addDoc(this.getEmployeesRef(), item);
  }
}
