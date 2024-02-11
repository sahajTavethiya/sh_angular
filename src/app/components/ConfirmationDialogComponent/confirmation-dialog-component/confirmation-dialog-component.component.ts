import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-component',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmation-dialog-component.component.html',
  styleUrl: './confirmation-dialog-component.component.css'
})
export class ConfirmationDialogComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { header: string ,message: string }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
