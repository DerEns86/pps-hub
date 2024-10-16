import { TestBed } from '@angular/core/testing';
import { MachineParkService } from './machine-park.service';
import { Machine } from '../interfaces/machine';
import { of } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { SnackbarService } from './snackbar.service';
import { mockFirestoreService, mockSnackbarService } from './mock-service';

describe('MachineParkService', () => {
  let service: MachineParkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MachineParkService,
        { provide: FirebaseService, useValue: mockFirestoreService },
        { provide: SnackbarService, useValue: mockSnackbarService },
      ],
    });
    service = TestBed.inject(MachineParkService);
    mockFirestoreService.projectList$ = of([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addMachine', () => {
    it('should add a machine and show success snackbar', () => {
      const machine: Machine = {
        id: '1', type: 'mill',
        manufacturer: '',
        name: '',
        maxDimension: '',
        assignedEmployee: ''
      };
      service.addMachine(machine);
      expect(service.machineList).toContain(machine);
      expect(mockFirestoreService.addMachines).toHaveBeenCalledWith(machine);
      expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Machine added', 'success-snackbar');
    });

    it('should show error snackbar if add machine fails', () => {
      const machine: Machine = {
        id: '1', type: 'mill',
        manufacturer: '',
        name: '',
        maxDimension: '',
        assignedEmployee: ''
      };
      mockFirestoreService.addMachines.mockImplementation(() => {
        throw new Error('Add failed');
      });
      service.addMachine(machine);
      expect(service.machineList).toContainEqual(machine); // Machine is still added to the list
      expect(mockFirestoreService.addMachines).toHaveBeenCalledWith(machine);
      expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('The machine could not be added. Please check your connection and try again', 'error-snackbar');
    });
  });

  describe('deleteMachine', () => {
    it('should delete a machine and show success snackbar', () => {
      const docId = '1';
      service.deleteMachine(docId);
      expect(mockFirestoreService.deleteMachine).toHaveBeenCalledWith(docId);
      expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Machine deleted successfully', 'success-snackbar');
    });

    it('should show error snackbar if delete machine fails', () => {
      const docId = '1';
      mockFirestoreService.deleteMachine.mockImplementation(() => {
        throw new Error('Delete failed');
      });
      service.deleteMachine(docId);
      expect(mockFirestoreService.deleteMachine).toHaveBeenCalledWith(docId);
      expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('The machine could not be deleted. Please check your connection and try again', 'error-snackbar');
    });
  });

  describe('updateMachine', () => {
    it('should update a machine and show success snackbar', () => {
      const machine: Machine = {
        id: '1', type: 'mill',
        manufacturer: '',
        name: '',
        maxDimension: '',
        assignedEmployee: ''
      };
      service.updateMachine(machine.id!, machine);
      expect(mockFirestoreService.updateMachine).toHaveBeenCalledWith(machine.id, machine);
      expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Machine updated', 'custom-snackbar');
    });

    it('should show error snackbar if update machine fails', () => {
      const machine: Machine = {
        id: '1', type: 'mill',
        manufacturer: '',
        name: '',
        maxDimension: '',
        assignedEmployee: ''
      };
      mockFirestoreService.updateMachine.mockImplementation(() => {
        throw new Error('Update failed');
      });
      service.updateMachine(machine.id!, machine);
      expect(mockFirestoreService.updateMachine).toHaveBeenCalledWith(machine.id, machine);
      expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('The machine could not be updated. Please check your connection and try again', 'error-snackbar');
    });
  });

  describe('findMachineById', () => {
    it('should return a machine by id', () => {
      const docId = '1';
      const machine = { id: '1', type: 'mill', status: 'active' } as any;
      mockFirestoreService.getSingleDocRef.mockReturnValue(machine);
      const result = service.findMachineById(docId);
      expect(result).toEqual(machine);
      expect(mockFirestoreService.getSingleDocRef).toHaveBeenCalledWith('machines', docId);
    });

  });
});
