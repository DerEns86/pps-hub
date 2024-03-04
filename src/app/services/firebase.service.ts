import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Project } from '../models/projects.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  unsubProjectsList: () => void;
  firebase: Firestore = inject(Firestore);
  constructor() {
    this.unsubProjectsList = this.snapProjectsList();
  }


  ngOnDestroy() {
    this.unsubProjectsList();
  }
  getProjects() {
    return collection(this.firebase, 'projects');
  }

  getEmployees() {
    return collection(this.firebase, 'employees');
  }

  snapProjectsList() {
    return onSnapshot(this.getProjects(), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('snap: ', doc.data());
      });
    });
  }

  async addProject(item: Project) {
    await addDoc(this.getProjects(), item);
  }
}
