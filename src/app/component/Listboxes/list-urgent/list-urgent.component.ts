import { Component, Input, OnInit } from '@angular/core';
import { TasksUrgentComponent } from '../../TaskLists/tasks-urgent/tasks-urgent.component';

@Component({
  selector: 'app-list-urgent',
  standalone: true,
  imports: [TasksUrgentComponent,],
  templateUrl: './list-urgent.component.html',
  styleUrl: './list-urgent.component.css'
})
export class ListUrgentComponent implements OnInit{

  ngOnInit(): void {
      
  }

}
