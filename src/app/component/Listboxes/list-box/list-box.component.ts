import { Component, Input, OnInit } from '@angular/core';
import { TasksComponent } from '../../TaskLists/tasks/tasks.component';
// import { tasks } from '../../../Data/MockTaskData';

@Component({
  selector: 'app-list-box',
  standalone: true,
  imports: [TasksComponent],
  templateUrl: './list-box.component.html',
  styleUrl: './list-box.component.css'
})
export class ListBoxComponent implements OnInit{

  //listOfTasks = tasks;

  ngOnInit(): void {
      
  }
}
