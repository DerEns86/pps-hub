import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMachineComponent } from './dialog-add-machine.component';

describe('DialogAddMachineComponent', () => {
  let component: DialogAddMachineComponent;
  let fixture: ComponentFixture<DialogAddMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
