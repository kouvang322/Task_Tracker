import { Component, Input, OnInit } from '@angular/core';
import { TasksComponent } from '../../TaskLists/tasks/tasks.component';
import { TasksMedComponent } from '../../TaskLists/tasks-med/tasks-med.component';


@Component({
  selector: 'app-list-box-med',
  standalone: true,
  imports: [TasksMedComponent],
  templateUrl: './list-box-med.component.html',
  styleUrl: './list-box-med.component.css'
})
export class ListBoxMedComponent implements OnInit{

  ngOnInit(): void {
      
  }
}
