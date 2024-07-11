import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrl:'./create-dialog.component.css',
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
