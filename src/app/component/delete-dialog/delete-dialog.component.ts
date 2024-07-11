import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl:`./delete-dialog.component.css`,
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
