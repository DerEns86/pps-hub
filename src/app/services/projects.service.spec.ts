import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { FirebaseService } from './firebase.service';
import { mockFirestoreService, mockSnackbarService } from './mock-service';
import { SnackbarService } from './snackbar.service';
import { Project } from '../interfaces/project';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      ProjectsService,
      { provide: FirebaseService , useValue: mockFirestoreService },
      { provide: SnackbarService, useValue: mockSnackbarService },
    ],});
    service = TestBed.inject(ProjectsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete project and show success snackbar', () => {
    service.deleteProject('1');
    expect(mockFirestoreService.deleteProject).toHaveBeenCalledWith('1');
    expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Project deleted', 'success-snackbar');
  });

  it('should show error snackbar if delete project fails', () => {
    mockFirestoreService.deleteProject.mockImplementation(() => {
      throw new Error('Delete failed');
    });
    service.deleteProject('1');
    expect(mockFirestoreService.deleteProject).toHaveBeenCalledWith('1');
    expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Something went wrong. Please try again later', 'error-snackbar');
  });

  it('should update project and show success snackbar', () => {
    const project = { id: '1', projectId: 123, customer: 'John', article: 'test', deliveryDate: 1700, scheduledTime: 3, usedMachine: '1', status: 'active' as 'active', notification: 'test'};
    service.updateProject('1', project);
    expect(mockFirestoreService.updateProject).toHaveBeenCalledWith('1', project);
    expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Project updated', 'custom-snackbar');
  });

  it('should filter projects by machine number', () => {
    const projects: Project[] = [
      { id: '1', projectId: 123, article: 'test', customer: 'John', deliveryDate: 1700, notification: 'test', scheduledTime: 3, status: 'active', usedMachine: '1' },
      { id: '2', projectId: 124, article: 'test', customer: 'Doe', deliveryDate: 1800, notification: 'test', scheduledTime: 4, status: 'active', usedMachine: '2' },
      { id: '3', projectId: 125, article: 'test', customer: 'Smith', deliveryDate: 1900, notification: 'test', scheduledTime: 5, status: 'active', usedMachine: '1' },
    ];

    jest.spyOn(service, 'sortProjectsByDate').mockReturnValue(projects);

    const filteredProjects = service.filterProjectsByMachine('1');

    expect(filteredProjects).toEqual([
      { id: '1', projectId: 123, article: 'test', customer: 'John', deliveryDate: 1700, notification: 'test', scheduledTime: 3, status: 'active', usedMachine: '1' },
      { id: '3', projectId: 125, article: 'test', customer: 'Smith', deliveryDate: 1900, notification: 'test', scheduledTime: 5, status: 'active', usedMachine: '1' },
    ]);
  });

  it('should sort projects by delivery date', () => {
    service.projectList = [
      { id: '1', projectId: 123, name: 'Project 1', article: 'test', customer: 'John', deliveryDate: 1700, notification: 'test', scheduledTime: 3, status: 'active', usedMachine: '1' },
      { id: '2', projectId: 124, name: 'Project 2', article: 'test', customer: 'Doe', deliveryDate: 1800, notification: 'test', scheduledTime: 4, status: 'active', usedMachine: '2' },
      { id: '3', projectId: 125, name: 'Project 3', article: 'test', customer: 'Smith', deliveryDate: 1600, notification: 'test', scheduledTime: 5, status: 'active', usedMachine: '1' },
    ];

    const sortedProjects = service.sortProjectsByDate();

    expect(sortedProjects).toEqual([
      { id: '3', projectId: 125, name: 'Project 3', article: 'test', customer: 'Smith', deliveryDate: 1600, notification: 'test', scheduledTime: 5, status: 'active', usedMachine: '1' },
      { id: '1', projectId: 123, name: 'Project 1', article: 'test', customer: 'John', deliveryDate: 1700, notification: 'test', scheduledTime: 3, status: 'active', usedMachine: '1' },
      { id: '2', projectId: 124, name: 'Project 2', article: 'test', customer: 'Doe', deliveryDate: 1800, notification: 'test', scheduledTime: 4, status: 'active', usedMachine: '2' },
    ]);
  });

  it('should change the status of the project and show success snackbar', () => {
    const project: Project = {
      id: '1', status: 'active', scheduledTime: 3, usedMachine: '1',
      projectId: 0,
      customer: '',
      article: '',
      deliveryDate: 0,
      notification: ''
    };
    service.changeStatus(project, 'paused');
    expect(project.status).toBe('paused');
    expect(mockFirestoreService.updateProject).toHaveBeenCalledWith('1', project);
    expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Status changed', 'custom-snackbar');
  });

  it('should show error snackbar if update project fails', () => {
    const project: Project = {
      id: '1', status: 'active', scheduledTime: 3, usedMachine: '1',
      projectId: 0,
      customer: '',
      article: '',
      deliveryDate: 0,
      notification: ''
    };
    mockFirestoreService.updateProject.mockImplementation(() => {
      throw new Error('Update failed');
    });
    service.changeStatus(project, 'paused');
    expect(project.status).toBe('paused');
    expect(mockFirestoreService.updateProject).toHaveBeenCalledWith('1', project);
    expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Something went wrong. Please try again later', 'error-snackbar');
  });

  it('should calculate the scheduled time for a given machine', () => {
    service.projectList = [
      { id: '1', projectId: 123, name: 'Project 1', article: 'test', customer: 'John', deliveryDate: 1700, notification: 'test', scheduledTime: 3, status: 'active', usedMachine: '1' },
      { id: '2', projectId: 124, name: 'Project 2', article: 'test', customer: 'Doe', deliveryDate: 1800, notification: 'test', scheduledTime: 4, status: 'active', usedMachine: '2' },
      { id: '3', projectId: 125, name: 'Project 3', article: 'test', customer: 'Smith', deliveryDate: 1600, notification: 'test', scheduledTime: 5, status: 'active', usedMachine: '1' },
    ];

    const scheduledTime = service.calcSheduledTimePerMachine('1');
    expect(scheduledTime).toBe(8); // 3 + 5
  });

  it('should return 0 if no projects are found for the given machine', () => {
    service.projectList = [
      { id: '1', projectId: 123, name: 'Project 1', article: 'test', customer: 'John', deliveryDate: 1700, notification: 'test', scheduledTime: 3, status: 'active', usedMachine: '2' },
    ];

    const scheduledTime = service.calcSheduledTimePerMachine('1');
    expect(scheduledTime).toBe(0);
  });

  describe('addProject', () => {
    it('should add a project and show success snackbar', () => {
      const project: Project = {
        id: '1', status: 'active', scheduledTime: 3, usedMachine: '1',
        projectId: 0,
        customer: '',
        article: '',
        deliveryDate: 0,
        notification: ''
      };
      service.addProject(project);
      expect(service.projectList).toContain(project);
      expect(mockFirestoreService.addProject).toHaveBeenCalledWith(project);
      expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Product added', 'success-snackabr');
    });

    it('should show error snackbar if add project fails', () => {
      const project: Project = {
        id: '1', status: 'active', scheduledTime: 3, usedMachine: '1',
        projectId: 0,
        customer: '',
        article: '',
        deliveryDate: 0,
        notification: ''
      };
      mockFirestoreService.addProject.mockImplementation(() => {
        throw new Error('Add failed');
      });
      service.addProject(project);
      expect(service.projectList).toContain(project); // Project is still added to the list
      expect(mockFirestoreService.addProject).toHaveBeenCalledWith(project);
      expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Something went wrong. Please try again later', 'error-snackbar');
    });
  });

});
