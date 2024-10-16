import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardComponent } from './project-card.component';
import { ProjectsService } from '../../services/projects.service';
import { FirebaseService } from '../../services/firebase.service';
import { mockFirestoreService, mockProjectService } from '../../services/mock-service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  let projectService: ProjectsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCardComponent],
      imports: [MatCardModule,
        MatIconModule,
        MatMenuModule,
        BrowserAnimationsModule
      ],
      providers: [ProjectsService,
        { provide: ProjectsService, useValue: mockProjectService},
        { provide: FirebaseService, useValue: mockFirestoreService}
      ]
    })
    .compileComponents();

    projectService = TestBed.inject(ProjectsService);
    
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
    it('should call projectService.changeStatus with "active" when project is defined', () => {
      const project = { id: '1', projectId: 123, customer: 'John', article: 'test', deliveryDate: 1700, scheduledTime: 3, usedMachine: '1', status: 'active' as 'active', notification: 'test'};
      component.project = project;
      projectService.changeStatus(project, "active")
      component.changeStatusToActive();
      expect(projectService.changeStatus).toHaveBeenCalledWith(project, 'active');
    });

    it('should call projectService.changeStatus with "paused" when project is defined', () => {
      const project = { id: '1', projectId: 123, customer: 'John', article: 'test', deliveryDate: 1700, scheduledTime: 3, usedMachine: '1', status: 'paused' as 'paused', notification: 'test'};
      component.project = project;
      projectService.changeStatus(project, "paused")
      component.changeStatusToActive();
      expect(projectService.changeStatus).toHaveBeenCalledWith(project, 'paused');
    });

    it('should call projectService.changeStatus with "finished" when project is defined', () => {
      const project = { id: '1', projectId: 123, customer: 'John', article: 'test', deliveryDate: 1700, scheduledTime: 3, usedMachine: '1', status: 'finished' as 'finished', notification: 'test'};
      component.project = project;
      projectService.changeStatus(project, "finished")
      component.changeStatusToActive();
      expect(projectService.changeStatus).toHaveBeenCalledWith(project, 'finished');
    });

});
