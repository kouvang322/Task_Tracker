import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksUrgentComponent } from './tasks-urgent.component';

describe('TasksUrgentComponent', () => {
  let component: TasksUrgentComponent;
  let fixture: ComponentFixture<TasksUrgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksUrgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksUrgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
