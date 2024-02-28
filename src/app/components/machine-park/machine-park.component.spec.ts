import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineParkComponent } from './machine-park.component';

describe('MachineParkComponent', () => {
  let component: MachineParkComponent;
  let fixture: ComponentFixture<MachineParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineParkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MachineParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
