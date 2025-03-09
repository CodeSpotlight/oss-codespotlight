import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class EmailService {
  applicationSubmitted = signal<boolean>(false);
	http = inject(HttpClient);

	submitApplicationEmail(
		selectedArea: string,
		selectedTech: string,
		selectedProject: string,
		selectedDuration: string,
		fullName: string,
		contactEmail: string,
		message: string
	) {
		return this.http.post("https://server.codespotlight.dev/api/send-email", {
			selectedArea,
			selectedTech,
			selectedProject,
			selectedDuration,
			fullName,
			contactEmail,
			message,
		}).subscribe({
      next: (response) => {
        console.log("Email sent successfully:", response);
        this.applicationSubmitted.set(true);
        setTimeout(() => {
          this.applicationSubmitted.set(false);
        }, 3000);
      },
      error: (error) => {
        console.error("Failed to send email:", error);
        this.applicationSubmitted.set(false);
      },
    });
	}
}
