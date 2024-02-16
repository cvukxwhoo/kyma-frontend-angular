import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popup-edit-success',
  templateUrl: './popup-edit-success.component.html',
  styleUrls: ['./popup-edit-success.component.scss'],
})
export class PopupEditSuccessComponent {
  faCircleCheck = faCircleCheck;
  snackBarRef = inject(MatSnackBarRef);
}
