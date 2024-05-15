import { Component, OnInit, Input, Output } from '@angular/core';
import { Task } from '../../../interfaces/Task';
import { tasksMedium } from '../../../Data/MockTaskData';

@Component({
  selector: 'app-tasks-med',
  standalone: true,
  imports: [],
  templateUrl: './tasks-med.component.html',
  styleUrl: './tasks-med.component.css'
})
export class TasksMedComponent implements OnInit{

  @Input() listOfTasks = tasksMedium;


  ngOnInit(): void {

  }
}
