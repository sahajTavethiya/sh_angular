import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificatonService {

  constructor(readonly snackbar: MatSnackBar, readonly zone: NgZone) { }

  showError(message: string) {
    this.zone.run(() => {
      this.snackbar.open(message, 'X', {
        panelClass: ['error'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }

  showDefaultError() {
    this.zone.run(() => {
      this.snackbar.open('Please Enter all Required fields', 'X', {
        panelClass: ['error'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }

  showSuccess(message: string) {
    this.zone.run(() => {
      this.snackbar.open(message, 'X', {
        panelClass: ['success', 'custom-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }

  showLongSuccess(message: string) {
    this.zone.run(() => {
      this.snackbar.open(message, 'X', {
        panelClass: ['success', 'custom-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000
      });
    });
  }

}
