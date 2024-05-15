import { Component, OnInit, Input, Output } from '@angular/core';
import { Task } from '../../../interfaces/Task';
import { tasksHigh } from '../../../Data/MockTaskData';

@Component({
  selector: 'app-tasks-high',
  standalone: true,
  imports: [],
  templateUrl: './tasks-high.component.html',
  styleUrl: './tasks-high.component.css'
})
export class TasksHighComponent implements OnInit{

  @Input() listOfTasks = tasksHigh;


  ngOnInit(): void {

  }

}
