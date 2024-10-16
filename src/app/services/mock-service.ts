// mock-service.ts

import { initializeApp } from "@angular/fire/app";
import { filter, of } from "rxjs";
import { environment } from "../../environments/environment";
import { getFirestore } from "@angular/fire/firestore";

//Mock firestore
export const mockFirestore = {
  provideFirebaseApp: () => initializeApp(environment.firebaseConfig),
  provideFirestore: () => getFirestore(),
};

// Mock für den AuthService
export const mockAuthService = {
  login: jest.fn((email: string, password: string) =>
    Promise.resolve({
      user: { uid: '123' } // Simulierte Benutzerantwort von Firebase
    })
  ),
  logout: jest.fn(() => Promise.resolve()),
  register: jest.fn((username: string, email: string, password: string) =>
    Promise.resolve({ user: { uid: '456' } }) // Simulierte Antwort bei Registrierung
  )
};

// Mock MatDialogRef
export const mockMatDialogRef = {
  close: jest.fn(), // simuliert die close() Methode
  afterClosed: jest.fn().mockReturnValue(of(true)), // simuliert die Rückgabe eines Observables nach dem Schließen
};

// Mock für den SnackbarService
export const mockSnackbarService = {
  openSnackBar: jest.fn(),
};

// Mock für den FirestoreService
export const mockFirestoreService = {

  projectList$: of([]),
  machinesList$: of([]),
  employeeList$: of([]), 
  machinesList: [],

  setUserData: jest.fn((userId: string, data: any) =>
    Promise.resolve()
  ),
  getUserData: jest.fn((userId: string) =>
    Promise.resolve({ name: 'Test User', email: 'test@test.com' })
  ),

  addProject: jest.fn((project: any) =>
    Promise.resolve({ id: 1, ...project })
  ),
  deleteProject: jest.fn(),
  updateProject: jest.fn(),

  addMachines: jest.fn(),
  deleteMachine: jest.fn(),
  updateMachine: jest.fn(),
  getSingleDocRef: jest.fn(),

};

// Mock für den EmployeeService
export const mockEmployeeService = {

  isInEditMode: false,

  getEmployees: jest.fn(() =>
    Promise.resolve([
      { id: '1', employeeId: '123', name: 'Doe', surname: 'John', email: 'test@MatLine.de', activeMachine: '1', skills: ['Java', 'Angular'] },
      { id: '2', employeeId: '124', name: 'Doe', surname: 'Jane', email: 'jane@test.com', activeMachine: '2', skills: ['Java', 'React'] }
    ])
  ),
  addEmployee: jest.fn((employee: any) =>
    Promise.resolve({ id: 3, ...employee })
  ),
  updateEmployee: jest.fn((id: number, employee: any) =>
    Promise.resolve({ id, ...employee })
  ),
  deleteEmployee: jest.fn((id: string) =>
    Promise.resolve()
  ),
  getUnassignedEmployees: jest.fn(),
};

// Mock für den ProjectService
export const mockProjectService = {
  getProjects: jest.fn(() =>
    Promise.resolve([
      { id: '1', projectId: 123, customer: 'John', article: 'test', deliveryDate: 1700, scheduledTime: 3, usedMachine: '1', status: 'active' as 'active', notification: 'test' },
      { id: '2', projectId: 124, customer: 'Doe', article: 'test', deliveryDate: 1800, scheduledTime: 4, usedMachine: '2', status: 'active' as 'active', notification: 'test' }
    ])
  ),
  addProject: jest.fn((project: any) =>
    Promise.resolve({ id: 3, ...project })
  ),
  updateProject: jest.fn((id: number, project: any) =>
    Promise.resolve({ id, ...project })
  ),
  deleteProject: jest.fn((id: string) =>
    Promise.resolve()
  ),

  changeStatus: jest.fn(),
  filterProjects: jest.fn(),
  projectList: [],
};

// Mock für den MachineParkService
export const mockMachineParkService = {
  machineList: [],

  addMachine: jest.fn(),
  getMachineList: jest.fn(),
};
