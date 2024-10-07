import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Project } from '../interfaces/project';
import { BehaviorSubject, Subject } from 'rxjs';
import { Machine } from '../interfaces/machine';
import { Employee } from '../interfaces/employee';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService implements OnDestroy {

  projectList: Project[] = [];
  machinesList: Machine[] = [];
  employeesList: Employee[] = [];

  projectList$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(this.projectList);
  machinesList$: BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>(this.machinesList);
  employeesList$: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(this.employeesList);

  unsubProjectsSnapshot: () => void;
  unsubMachinesSnapshot: () => void;
  unsubEmployeesSnapshot: () => void;

  firebase: Firestore = inject(Firestore);

  constructor() {
    this.unsubProjectsSnapshot = this.snapShotProjectsList();
    this.unsubMachinesSnapshot = this.snapShotMachinesList();
    this.unsubEmployeesSnapshot = this.snapShotEmployeesList();
  }

  ngOnDestroy() {
    this.unsubAllSnapshots();
  }

  unsubAllSnapshots() {
    this.unsubProjectsSnapshot();
    this.unsubMachinesSnapshot();
    this.unsubEmployeesSnapshot();
  }

  private handleSnapshot<T extends { id?: string }>(querySnapshot: any, list: T[], subject: Subject<T[]>, logMessage: string) {
    list.length = 0;
    querySnapshot.forEach((doc: any) => {
      const data = doc.data() as T;
      data.id = doc.id;
      list.push(data);
    });
    subject.next(list);
    console.log(logMessage, list);
  }
  
  snapShotProjectsList() {
    return onSnapshot(this.getCollectionRef('projects'), 
      (querySnapshot) => this.handleSnapshot(querySnapshot, this.projectList, this.projectList$, 'projectList'),
      (error) => console.error("Error fetching project snapshots: ", error)
    );
  }
  
  snapShotMachinesList() {
    return onSnapshot(this.getCollectionRef('machines'), 
      (querySnapshot) => this.handleSnapshot(querySnapshot, this.machinesList, this.machinesList$, 'machineList'),
      (error) => console.error("Error fetching machine snapshots: ", error)
    );
  }
  
  snapShotEmployeesList() {
    return onSnapshot(this.getCollectionRef('employees'), 
      (querySnapshot) => this.handleSnapshot(querySnapshot, this.employeesList, this.employeesList$, 'employeesList'),
      (error) => console.error("Error fetching employee snapshots: ", error)
    );
  }

  getCollectionRef(collectionName: string) {
    return collection(this.firebase, collectionName);
  }

  getProjectList(): Project[] {
    return this.projectList;
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firebase, colId), docId);
  }

  async addProject(project: Project) {
    await addDoc(this.getCollectionRef('projects'), project);
  }

  async deleteProject(docId: string) {
    await deleteDoc(this.getSingleDocRef('projects', docId));
  }

  async updateProject(docId: string, item: Partial<Project>) {
    await updateDoc(this.getSingleDocRef('projects', docId), item);
  }

  async addMachines(machine: Machine) {
   return addDoc(this.getCollectionRef('machines'), machine);
  }

  async updateMachine(docId: string, machine: Partial<Machine>) {
    await updateDoc(this.getSingleDocRef('machines', docId), machine);
  }

  async deleteMachine(docId: string) {
    await deleteDoc(this.getSingleDocRef('machines', docId));
  }

  async addEmployee(employee: Employee) {
    await addDoc(this.getCollectionRef('employees'), employee);
  }

  async updateEmployee(docId: string, item: Partial<Employee>) {
    await updateDoc(this.getSingleDocRef('employees', docId), item);
  }

  async deleteEmployee(docId: string) {
    await deleteDoc(this.getSingleDocRef('employees', docId));
  }
}
