import { Component } from '@angular/core';
import { tasksHigh, tasksLow, tasksUrgent, tasksMedium } from '../../Data/MockTaskData';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDropListGroup],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  lowTasks = tasksLow;

  medTasks = tasksMedium;

  highTasks = tasksHigh;

  urgentTasks = tasksUrgent;

  public inProgressTasks: Task[] = [];
  public completedTasks: Task[] = [];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
