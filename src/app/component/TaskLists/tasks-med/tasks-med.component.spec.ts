import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksMedComponent } from './tasks-med.component';

describe('TasksMedComponent', () => {
  let component: TasksMedComponent;
  let fixture: ComponentFixture<TasksMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksMedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
