import { ChangeDetectionStrategy, Component, Input, OnInit, inject, Inject, } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { Task } from '../../interfaces/Task';
import { NeonDbService } from '../../services/neon-db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewTaskDialog } from '../view-task-dialog/view-task-dialog.component';
import { CreateDialog } from '../create-dialog/create-dialog.component';
import { DeleteDialog } from '../delete-dialog/delete-dialog.component';
import { User } from '../../interfaces/User';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, DeleteDialog, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../styles.css']
})
export class DashboardComponent {
  readonly dialog = inject(MatDialog);

  loggedinUser_Id: Number | null = 0;
  loggedinUsername: string | null = '';
  
  userIsLoggedIn!: Boolean;

  dataList: Task[] = [];

  movedTask?: Task;
  lowTasks: Task[] = [];
  medTasks: Task[] = [];
  highTasks: Task[] = [];
  urgentTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private dataService: NeonDbService, private cdRef: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document, private router: Router) {
    
    const localStorage = document.defaultView?.localStorage;
    if(localStorage){
 
      try {
        
        this.loggedinUser_Id = Number(localStorage.getItem('user_id'));
        this.loggedinUsername = localStorage.getItem('username');
        
        if (this.loggedinUser_Id && this.loggedinUsername) {
          this.dataService.setUser({loggedinUser_Id: this.loggedinUser_Id, loggedinUsername: this.loggedinUsername });
        }
        
      } catch (error) {
        console.log(error);
      }
      
    }
  }
  
  ngOnInit(): void {
    this.refreshList();
    this.checkIfUserLoggedIn();
  }
  openDeleteDialog(taskItem: Task) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: { taskId: taskItem.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteSelectedTask(taskItem.id);
      } else {
        alert("Deletion cancelled");
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateDialog, {
      data: {title: '', description: '', priority: 'low'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.addNewTask(result, this.loggedinUser_Id!);
      }else{
        alert("Task Creation cancelled.")
      }
    })
  }
  
  originalTask!: Task;
  openViewTaskDialog(viewTask: Task) {
    const dialogRef = this.dialog.open(ViewTaskDialog, {
      data: {id: viewTask.id, title: viewTask.title , description: viewTask.description, priority: viewTask.priority, user_id: viewTask.user_id}
    });

    this.originalTask = viewTask;
    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        console.log(result);
        this.removeTaskFromList(this.originalTask, this.originalTask.priority)
        console.log(this.loggedinUser_Id);
        this.updateTaskInfo(result, this.loggedinUser_Id!);
        this.addTaskToList(result);
       
      }else{
        alert("No changes made.")
      }
    })
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
    } else {
      this.dataList.push(taskToAdd);
    }

    try {
      this.addedTaskPriotity = taskToAdd?.priority;
    } catch (error) {
      console.log(error);
    }

    if (this.addedTaskPriotity) {
      switch (this.addedTaskPriotity) {
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
      this.cdRef.detectChanges();

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
    this.cdRef.detectChanges();
  }

  
  updateTaskInfo(changedTask: Task, loggedinUserId: Number){
    this.dataService.taskInfoChanged(changedTask, loggedinUserId).subscribe(response => {
      console.log(response); // Handle the response here
    }, (error) => {
      console.log(error);
    });
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
        this.updateTaskInfo(this.movedTask as Task, this.loggedinUser_Id!);
      } catch (error) {
        console.log(error)
      }
      console.log(this.movedTask)
    }
  }

  // change the priority property of the moved item
  // pass in the item moved and the "string"(id) of the new list
  changeProperty(item: any, newPriority: string) {
    item.priority = newPriority;
  }

  createdTaskData!: Task;
  addNewTask(newTask: object, userId: Number) {
    this.dataService.createTaskItem(newTask, userId).subscribe((data: Task) => {
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

  checkIfUserLoggedIn(){
    this.userIsLoggedIn = this.dataService.userLoggedIn();
  }
  
  logoutUser(){
    this.dataService.logout();
    this.checkIfUserLoggedIn();
    this.successfullLogout();
  }
  
  successfullLogout(){
    alert("You have logged out.");
    this.router.navigate(['/']);
  }

  goToLoginPage(){
    this.router.navigate(['/LoginOrRegister']);
  }
}
 

