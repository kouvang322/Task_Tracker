import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksHighComponent } from './tasks-high.component';

describe('TasksHighComponent', () => {
  let component: TasksHighComponent;
  let fixture: ComponentFixture<TasksHighComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksHighComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksHighComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
