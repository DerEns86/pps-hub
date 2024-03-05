import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Project } from '../models/projects.class';


@Injectable({
  providedIn: 'root'
})



export class FirebaseService implements OnDestroy {

  projectList: Project[] = [];

 
  firebase: Firestore = inject(Firestore);

  constructor() {
  
  }


  ngOnDestroy() {

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
}
