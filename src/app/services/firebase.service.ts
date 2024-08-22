import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Project } from '../interfaces/project';
import { BehaviorSubject } from 'rxjs';
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
  MachinesList$: BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>(this.machinesList);
  employeesList$: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(this.employeesList);

  unsubProjectsSnapshot;
  unsubMachinesSnapshot;
  unsubEmployeesSnapshot;
  firebase: Firestore = inject(Firestore);

  constructor() {
    this.unsubProjectsSnapshot = this.snapShotProjectsList();
    this.unsubMachinesSnapshot = this.snapShotMachinesList();
    this.unsubEmployeesSnapshot = this.snapShotEmployeesList();
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
    },
    (error)=>{
      console.error("Error fetching project snapshots: ", error)
    }
  );
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
    },
    (error)=>{
      console.error("Error fetching machine snapshots: ", error)
    }
  );
  }

  snapShotEmployeesList() {
    return onSnapshot(this.getEmployeesRef(), (querySnapshot) => {
      this.employeesList = [];
      querySnapshot.forEach((doc) => {
        const employeeData = doc.data() as Employee;
        employeeData.id = doc.id;
        this.employeesList.push(employeeData);
      });
      this.employeesList$.next(this.employeesList);
      console.log('machineList', this.employeesList);
    },
    (error)=>{
      console.error("Error fetching machine snapshots: ", error)
    }
  );
  }




  ngOnDestroy() {
    this.unsubProjectsSnapshot();
    this.unsubMachinesSnapshot();
    this.unsubEmployeesSnapshot();
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
