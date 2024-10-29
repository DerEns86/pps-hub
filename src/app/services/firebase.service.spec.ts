import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { mockFirestore, mockFirestoreService } from './mock-service';
import { Firestore, FirestoreError, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';
import { environment } from '../../environments/environment.development';

describe('FirebaseService', () => {
  let service: FirebaseService;

  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseService, useValue: mockFirestoreService },
        { provide: Firestore, useValue: mockFirestore }
      ]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
