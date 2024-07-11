import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'view-task-dialog',
  templateUrl: './view-task-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './view-task-dialog.component.css'
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