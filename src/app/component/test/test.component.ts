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
import { subscribe } from 'node:diagnostics_channel';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDropListGroup,],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  providers: [NeonDbService]
})
export class TestComponent implements OnInit {
  dataList: Task[] = [];

  movedTask?: Task;
  lowTasks: Task[] = [];
  medTasks: Task[] = [];
  highTasks: Task[] = [];
  urgentTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private dataService: NeonDbService) { }

  sayHelloFromService() {
    this.dataService.sayHello();
  }

  ngOnInit(): void {
    this.refreshList();
  }

  clearTaskArrays() {
    this.lowTasks = [];
    this.medTasks = [];
    this.highTasks = [];
    this.urgentTasks = [];
    this.inProgressTasks = [];
    this.completedTasks = [];
  }

  getDbData() {
    this.dataService.getData().subscribe((data: Task[]) => {
      this.dataList = data;
      this.populateDisplayLists();

    });
  }
  refreshList() {
    this.clearTaskArrays();
    this.getDbData();
  }

  populateDisplayLists() {
    this.dataList.forEach(task => {
      switch (task.priority) {
        case 'low':
          this.lowTasks.push(task);
          break;
        case 'medium':
          this.medTasks.push(task);
          break;
        case 'high':
          this.highTasks.push(task);
          break;
        case 'urgent':
          this.urgentTasks.push(task);
          break;
        case 'inProgress':
          this.inProgressTasks.push(task);
          break;
        case 'completed':
          this.completedTasks.push(task);
          break;
        default:
          break;
      }
    })
  }


  addedTaskPriotity: string | undefined;
  addTaskToList(taskToAdd: Task | undefined) {
    if (taskToAdd === undefined) {
      console.error('Task is undefined');
      return;
    }else{
      this.dataList.push(taskToAdd);
    }

    try {
      this.addedTaskPriotity = taskToAdd?.priority;

    } catch (error) {
      console.log(error);
    }

    if (this.addedTaskPriotity) {
      switch (this.addedTaskPriotity){
        case 'low':
          this.lowTasks.push(taskToAdd);
          break;
        case 'medium':
          this.medTasks.push(taskToAdd);
          break;
        case 'high':
          this.highTasks.push(taskToAdd);
          break;
        case 'urgent':
          this.urgentTasks.push(taskToAdd);
          break;
        case 'inProgress':
          this.inProgressTasks.push(taskToAdd);
          break;
        case 'completed':
          this.completedTasks.push(taskToAdd);
          break;
        default:
          break;

      }

    } else {
      console.error('Task priority location is undefined');
    }

  }

  removeTaskFromList(taskToRemove: Task | undefined, dataChangedLocation: string) {
    switch (dataChangedLocation) {
      case 'low':
        this.lowTasks = this.lowTasks.filter(task => task.id !== taskToRemove?.id);
        break;
      case 'medium':
        this.medTasks = this.medTasks.filter(task => task.id !== taskToRemove?.id);
        break;
      case 'high':
        this.highTasks = this.highTasks.filter(task => task.id !== taskToRemove?.id);
        break;
      case 'urgent':
        this.urgentTasks = this.urgentTasks.filter(task => task.id !== taskToRemove?.id);
        break;
      case 'inProgress':
        this.inProgressTasks = this.inProgressTasks.filter(task => task.id !== taskToRemove?.id);
        break;
      case 'completed':
        this.completedTasks = this.completedTasks.filter(task => task.id !== taskToRemove?.id);
        break;
      default:
        break;
    }
  }


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
      console.log(this.movedTask);
      this.changeProperty(this.movedTask, b.container.id);

      try {
        this.dataService.taskMoved((this.movedTask?.id as number), (this.movedTask as Task)).subscribe(response => {
          console.log(response); // Handle the response here
        });
      } catch (error) {
        console.log(error)
      }

      console.log(this.movedTask)
      // console.log(b.container.id)
    }
  }

  // change the priority property of the moved item
  // pass in the item moved and the "string"(id) of the new list
  changeProperty(item: any, newPriority: string) {
    item.priority = newPriority;
  }

  createdTaskData!: Task;
  addNewTask() {
    this.dataService.createTaskItem().subscribe((data: Task) => {
      this.createdTaskData = data;
      console.log(this.createdTaskData);
      this.addTaskToList(this.createdTaskData);

    }, (error) => {
      console.log(error);
    });
  }

  deletedTask!: Task | undefined;
  deletedTaskLocation!: string | undefined;
  deleteSelectedTask(taskId: number | undefined): void {
    if (taskId === undefined) {
      console.error('Task ID is undefined');
      return;
    }

    this.deletedTask = this.dataList.find(task => task.id === taskId);
    console.log(this.deletedTask);

    this.deletedTaskLocation = this.deletedTask ? this.deletedTask.priority : undefined;
    console.log(this.deletedTaskLocation);

    this.dataService.deleteTask(taskId).subscribe(
      response => {
        if (this.deletedTaskLocation) {
          this.removeTaskFromList(this.deletedTask, this.deletedTaskLocation);
        } else {
          console.error('Task priority location is undefined');
          // Handle the case where task priority is not found
        }
      },
      error => {
        console.error('Error deleting task', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  }

  taskClicked() {
    this.sayHelloFromService();
  }
}
