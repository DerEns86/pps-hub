import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Project } from '../interfaces/project';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})



export class FirebaseService implements OnDestroy {

  projectList: Project[] = [];

  projectList$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(this.projectList);
 
  unsubProjectsSnapshot;
  firebase: Firestore = inject(Firestore);

  constructor() {
    this.unsubProjectsSnapshot = this.snapShotProjectsList();
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


  ngOnDestroy() {
    this.unsubProjectsSnapshot();
  }
  getProjectsRef() {
    return collection(this.firebase, 'projects');
  }

  getEmployees() {
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
}
