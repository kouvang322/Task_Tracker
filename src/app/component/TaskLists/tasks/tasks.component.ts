import { Component, OnInit, Input, Output } from '@angular/core';
import { Task } from '../../../interfaces/Task';
import { tasksLow } from '../../../Data/MockTaskData';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { 
  CdkDrag, 
  CdkDragDrop, 
  CdkDragEnd, 
  CdkDragEnter,
  CdkDropList, 
  moveItemInArray, 
  transferArrayItem,

} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  // @Input() task!: Task;

  @Input() listOfTasks = tasksLow;

  dragableTask?: Task;

  onTaskDragStart(event: any){
    this.dragableTask = event.target;
  }

  onDragOver(event: any){
    event.preventDefault();
  }

  onDrop(event: any){
    event.preventDefault();
    const targetTask = event.target;
    targetTask.priority = this.dragableTask;
  }

  ngOnInit(): void {

  }
}
