import { inject, Injectable } from '@angular/core';

import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  snackbar = inject(MatSnackBar);

  success(message: string) {
		this.snackbar.open(message, undefined, {
			verticalPosition: "bottom",
			horizontalPosition: "end",
			duration: 4000,
		});
	}

	error(message: string) {
		this.snackbar.open(message, "Close", {
			verticalPosition: "bottom",
			horizontalPosition: "end",
		});
	}
}
