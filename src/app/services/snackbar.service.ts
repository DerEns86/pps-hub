import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private _snackBar = inject(MatSnackBar);

  // durationInSeconds: number = 3;
  constructor() { }

  openSnackBar(message: string , cssClass: string) {
    this._snackBar.open(message, 'Close', {panelClass: [cssClass]})
  }
}
