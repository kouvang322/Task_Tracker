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
import { Task } from '../../interfaces/Task';
import { NeonDbService } from '../../services/neon-db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'delete-dialog',
  template: `<h2 mat-dialog-title>Delete This Task?</h2>
  <mat-dialog-content>Are you sure you want to delete this task?</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button style="background-color: red;" (click)="onNoClicked()">No</button>
    <button mat-button style="background-color: green;" (click)="onYesClicked()">Yes</button>
  </mat-dialog-actions>`,
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DeleteDialog {

  constructor(public dialogRef: MatDialogRef<DeleteDialog>, @Inject(MAT_DIALOG_DATA) public data: { taskId: number }) { }

  onYesClicked() {
    this.dialogRef.close('yes');
  }
  onNoClicked() {
    this.dialogRef.close('no');
  }
}

@Component({
  selector: 'create-dialog',
  template: `
  <h2 mat-dialog-title>Create New Task</h2>
  <mat-dialog-content>
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput [(ngModel)]="data.title" required>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput [(ngModel)]="data.description" required></textarea>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Priority</mat-label>
    <mat-select [(ngModel)]="data.priority">
      <mat-option value="low">Low</mat-option>
      <mat-option value="medium">Medium</mat-option>
      <mat-option value="high">High</mat-option>
      <mat-option value="urgent">Urgent</mat-option>
    </mat-select>
  </mat-form-field>
</mat-dialog-content>
<mat-dialog-actions >
    <button mat-button style="background-color: red;" (click)="onCancelClicked()">Cancel</button>
    <button mat-button style="background-color: green;" (click)="onCreateClicked()">Create Task</button>
  </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CreateDialog {
  form!: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateDialog>, @Inject(MAT_DIALOG_DATA) public data: {title: string, description: string, priority: string}){
  }

  onCreateClicked(): void{
    this.dialogRef.close(this.data)
  }
  onCancelClicked(): void{
    this.dialogRef.close();
  }
}

@Component({
  selector: 'view-task-dialog',
  template: `
  <h2 mat-dialog-title>View Task</h2>
  <mat-dialog-content>
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput [(ngModel)]="data.title" required>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput [(ngModel)]="data.description" required></textarea>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Priority</mat-label>
    <mat-select [(ngModel)]="data.priority">
      <mat-option value="low">Low</mat-option>
      <mat-option value="medium">Medium</mat-option>
      <mat-option value="high">High</mat-option>
      <mat-option value="urgent">Urgent</mat-option>
    </mat-select>
  </mat-form-field>
</mat-dialog-content>
<mat-dialog-actions >
    <button mat-button style="background-color: red;" (click)="onCloseClicked()">Close</button>
    <button mat-button style="background-color: green;" (click)="onUpdateTaskClicked()">Update Task</button>
  </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ViewTaskDialog {
  form!: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ViewTaskDialog>, @Inject(MAT_DIALOG_DATA) public data: {id: number, title: string, description: string, priority: string}){
  }

  onUpdateTaskClicked(): void{
    // console.log(this.data);
    this.dialogRef.close(this.data);
  }
  onCloseClicked(): void{
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, DeleteDialog,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly dialog = inject(MatDialog);

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
        this.addNewTask(result, this.dataService.loggedinUser_Id);
      }else{
        alert("Task Creation cancelled.")
      }
    })
  }
  
  originalTask!: Task;
  openViewTaskDialog(viewTask: Task) {
    const dialogRef = this.dialog.open(ViewTaskDialog, {
      data: {id: viewTask.id, title: viewTask.title , description: viewTask.description, priority: viewTask.priority, user_d: viewTask.user_id}
    });

    this.originalTask = viewTask;
    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        console.log(result);
        this.removeTaskFromList(this.originalTask, this.originalTask.priority)
        this.updateTaskInfo(result);
        this.addTaskToList(result);
       
      }else{
        alert("No changes made.")
      }
    })
  }

  dataList: Task[] = [];

  movedTask?: Task;
  lowTasks: Task[] = [];
  medTasks: Task[] = [];
  highTasks: Task[] = [];
  urgentTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private dataService: NeonDbService, private cdRef: ChangeDetectorRef) { }


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

  
  updateTaskInfo(changedTask: Task){
    this.dataService.taskInfoChanged(changedTask).subscribe(response => {
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
        this.updateTaskInfo(this.movedTask as Task);
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

  deleteTask(task: Task) {
    console.log(task);
  }

}

