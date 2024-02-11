import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-show-no-data-error',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './show-no-data-error.component.html',
  styleUrl: './show-no-data-error.component.css'
})
export class ShowNoDataErrorComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    console.log(this.data);
  }
}
