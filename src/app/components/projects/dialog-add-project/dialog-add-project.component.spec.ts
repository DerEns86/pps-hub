import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProjectComponent } from './dialog-add-project.component';
import { MachineParkService } from '../../../services/machine-park.service';
import { ProjectsService } from '../../../services/projects.service';
import { mockFirestoreService, mockMachineParkService, mockMatDialogRef, mockProjectService } from '../../../services/mock-service';
import { FirebaseService } from '../../../services/firebase.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogAddProjectComponent', () => {
  let component: DialogAddProjectComponent;
  let fixture: ComponentFixture<DialogAddProjectComponent>;

  let machineParkService: MachineParkService;
  let projectService: ProjectsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddProjectComponent],
      providers: [
        {provide: MachineParkService, useValue: mockMachineParkService},
        {provide: ProjectsService, useValue: mockProjectService},
        {provide: FirebaseService, useValue: mockFirestoreService},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
      ],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
      ]
    })
    .compileComponents();

    machineParkService = TestBed.inject(MachineParkService);
    projectService = TestBed.inject(ProjectsService);
    
    fixture = TestBed.createComponent(DialogAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
