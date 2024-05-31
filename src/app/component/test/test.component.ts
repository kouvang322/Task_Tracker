import { Component, OnInit } from '@angular/core';
import { tasksList } from '../../Data/MockTaskData';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Task } from '../../interfaces/Task';
import { Client } from "pg";
import { NeonDbService } from '../../services/neon-db.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDropListGroup,],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  providers: [NeonDbService]
})
export class TestComponent implements OnInit{
  // data: any;
  // connection: Client = this.dataService.client;

  constructor(private dataService: NeonDbService){}
  
  sayHelloFromService(){
      this.dataService.sayHello();
  }
    
    ngOnInit(): void {
      tasksList.map(task => {
        if(task.priority == "low"){
          this.lowTasks.push(task);
        }
        if(task.priority == "medium"){
          this.medTasks.push(task);
        }
        if(task.priority == "high"){
          this.highTasks.push(task);
        }
        if(task.priority == "urgent"){
          this.urgentTasks.push(task);
        }
        if(task.priority == "inProgress"){
          this.inProgressTasks.push(task);
        }
        if(task.priority == "completed"){
          this.completedTasks.push(task);
        }
      })
  }

  movedTask?: Task;
  lowTasks: Task[] = [];
  medTasks: Task[] = [];
  highTasks: Task[] = [];
  urgentTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  drop(b: CdkDragDrop<Task[]>) {
    if (b.previousContainer === b.container) {
      moveItemInArray(b.container.data, b.previousIndex, b.currentIndex);
    } else {
      transferArrayItem(
        b.previousContainer.data,
        b.container.data,
        b.previousIndex,
        b.currentIndex,
      );
      // code to reassign priority property

      // find and assign moveTask to the item that was moved
      this.movedTask = b.item.data;
      this.changeProperty(this.movedTask, b.container.id);

      console.log(this.movedTask)
      // console.log(b.container.id)
    }
  }

  // change the priority property of the moved item
  // pass in the item moved and the "string"(id) of the new list
  changeProperty(item: any, newPriority: string){
    item.priority = newPriority;
  }


  taskClicked(){
    this.sayHelloFromService();
  }
}
