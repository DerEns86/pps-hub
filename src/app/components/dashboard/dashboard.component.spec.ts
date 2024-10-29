import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ProjectsService } from '../../services/projects.service';
import { MachineParkService } from '../../services/machine-park.service';
import { EmployeeService } from '../../services/employee.service';
import { mockEmployeeService, mockFirestoreService, mockMachineParkService, mockProjectService } from '../../services/mock-service';
import { FirebaseService } from '../../services/firebase.service';
import { MatCardModule } from '@angular/material/card';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let projectService : ProjectsService;
  let machineParkService : MachineParkService;
  let employeeService : EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    providers: [
        { provide: ProjectsService, useValue: mockProjectService },
        { provide: MachineParkService, useValue: mockMachineParkService },
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: FirebaseService, useValue: mockFirestoreService },
    ],
    imports: [
        MatCardModule,
        DashboardComponent,
    ]
})
    .compileComponents();

    projectService = TestBed.inject(ProjectsService);
    machineParkService = TestBed.inject(MachineParkService);
    employeeService = TestBed.inject(EmployeeService);
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getProjectList', () =>{
    it('should return an empty list of project', ()=>{
      //GIVEN
      projectService.projectList = [
      ]
      //WHEN
      component.getProjectList();
      //THEN
      expect(projectService.projectList).toEqual([]);
    });

    it('should return a list with 1 project', ()=>{
      //GIVEN
      projectService.projectList = [
        { id: '1', projectId: 123, customer: 'John', article: 'test', deliveryDate: 1700, scheduledTime: 3, usedMachine: '1', status: 'active' as 'active', notification: 'test' } 
      ]
      //WHEN
      component.getProjectList();
      //THEN
      expect(projectService.projectList).toEqual([
        { id: '1', projectId: 123, customer: 'John', article: 'test', deliveryDate: 1700, scheduledTime: 3, usedMachine: '1', status: 'active' as 'active', notification: 'test' } 
      ]);
    });
  })
});
