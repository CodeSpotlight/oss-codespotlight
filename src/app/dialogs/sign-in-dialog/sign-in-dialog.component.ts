import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
	MatDialog,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../services/auth.service";
import { NotificationsService } from "../../services/notifications.service";

@Component({
	selector: "app-sign-in-dialog",
	imports: [
		MatDialogTitle,
		MatDialogActions,
		MatButtonModule,
    MatIconModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./sign-in-dialog.component.html",
	styleUrl: "./sign-in-dialog.component.scss",
})
export class SignInDialogComponent {
  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);

	async onGithubSignIn() {
		await this.authService.signInWithGithub();
	}
}
