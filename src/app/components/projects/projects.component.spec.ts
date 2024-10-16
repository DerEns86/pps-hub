import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { ProjectsService } from '../../services/projects.service';
import { MachineParkService } from '../../services/machine-park.service';
import { mockFirestoreService, mockMachineParkService, mockProjectService } from '../../services/mock-service';
import { FirebaseService } from '../../services/firebase.service';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseService, useValue: mockFirestoreService },
        { provide: ProjectsService, useValue: mockProjectService },
        { provide: MachineParkService, useValue: mockMachineParkService }
      ],
      imports: [
        MatTabsModule,
        BrowserAnimationsModule
      ],
      declarations: [ProjectsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the add dialog', () => {
    const dialogSpy = jest.spyOn(component.dialog, 'open');
    component.openAddDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

  describe('getMachineName', () => {
    it('should return the machine list', () => {
      //GIVEN
      const machineList = mockMachineParkService.machineList;
      const machine = { id: '1', name: 'Machine1' };
      //WHEN
      component.getMachineName('1');
      //THEN
      expect(machine.name).toBe('Machine1');
    });
  });
});
