import { Component, OnInit, Input, Output } from '@angular/core';
import { Task } from '../../../interfaces/Task';
import { tasksUrgent } from '../../../Data/MockTaskData';

@Component({
  selector: 'app-tasks-urgent',
  standalone: true,
  imports: [],
  templateUrl: './tasks-urgent.component.html',
  styleUrl: './tasks-urgent.component.css'
})
export class TasksUrgentComponent implements OnInit{

  @Input() listOfTasks = tasksUrgent;

  ngOnInit(): void {
      
  }

}
