import { Component, Input, OnInit } from '@angular/core';
import { TasksHighComponent } from '../../TaskLists/tasks-high/tasks-high.component';
// import { tasks } from '../../../Data/MockTaskData';

@Component({
  selector: 'app-list-box-high',
  standalone: true,
  imports: [TasksHighComponent,],
  templateUrl: './list-box-high.component.html',
  styleUrl: './list-box-high.component.css'
})
export class ListBoxHighComponent implements OnInit{


  ngOnInit(): void {
      
  }
}
