import { Component, inject, OnInit, signal } from "@angular/core";

import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { Project } from "../../models/project";
import { EmailService } from "../../services/email.service";

@Component({
	selector: "app-apply",
	imports: [
		FormsModule,
		MatStepperModule,
		MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
		MatRadioModule,
		MatButtonModule,
	],
	templateUrl: "./apply.component.html",
	styleUrl: "./apply.component.scss",
})
export class ApplyComponent implements OnInit {
	selectedArea = "";
	selectedTech = "";
	techOptions: string[] = [];
	availableProjects: Project[] = [];
	selectedProject: Project | null = null;
  durationOptions = ["1 month", "2 months", "3 months", "4 months", "5 months", "6 months"];
  selectedDuration = "";
  fullName = "";
  contactEmail = "";
  message = "";
  applicationSubmitted = false;
  emailService = inject(EmailService);

	ngOnInit() {
		this.selectedProject = null;
	}

	updateTechOptions() {
		if (this.selectedArea === "frontend") {
			this.techOptions = ["Angular", "Next.js"];
		} else if (this.selectedArea === "backend") {
			this.techOptions = ["Node.js"];
		} else {
			this.techOptions = [];
			this.availableProjects = [];
			this.selectedProject = null;
		}
	}

	updateAvailableProjects() {
		if (this.selectedTech === "Angular") {
			this.availableProjects = [
				{
					name: "Hashnode with Angular",
					url: "https://github.com/HashnodeWithAngular",
					image: "https://avatars.githubusercontent.com/u/161918167?s=200&v=4",
				},
			];
		} else if (this.selectedTech === "Next.js") {
			this.availableProjects = [
				{
					name: "Coming Soon",
					url: "https://google.com",
					image:
						"https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
				},
			];
		} else if (this.selectedTech === "Node.js") {
			this.availableProjects = [
				{
					name: "Coming Soon",
					url: "https://google.com",
					image:
						"https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
				},
			];
		} else {
			this.availableProjects = [];
			this.selectedProject = null;
		}
	}

	setSelectedProject(project: Project) {
		if (project.name !== "Coming Soon") {
			this.selectedProject = project;
			console.log(this.selectedProject);
		} else {
			this.selectedProject = null;
		}
	}

	submitApplication() {
    this.emailService.submitApplicationEmail(
      this.selectedArea,
      this.selectedTech,
      this.selectedProject!.name,
      this.selectedDuration,
      this.fullName,
      this.contactEmail,
      this.message
    );
	}
}
