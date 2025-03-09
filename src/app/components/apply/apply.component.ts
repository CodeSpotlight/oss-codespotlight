import { Component, OnInit, signal } from "@angular/core";

import { MatStepperModule } from "@angular/material/stepper";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { Project } from "../../models/project";

@Component({
	selector: "app-apply",
	imports: [FormsModule, MatStepperModule, MatRadioModule, MatButtonModule],
	templateUrl: "./apply.component.html",
	styleUrl: "./apply.component.scss",
})
export class ApplyComponent implements OnInit {
	selectedArea = "";
	selectedTech = "";
	techOptions: string[] = [];
	availableProjects: Project[] = [];
  selectedProject: Project | null = null;

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
				{ name: "Hashnode with Angular", url: "https://github.com/HashnodeWithAngular", image: "https://avatars.githubusercontent.com/u/161918167?s=200&v=4" },
			];
		} else if (this.selectedTech === "Next.js") {
      this.availableProjects = [
        { name: "Coming Soon", url: "https://google.com", image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
      ];
    } else if (this.selectedTech === "Node.js") {
      this.availableProjects = [
        { name: "Coming Soon", url: "https://google.com", image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
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

	apply() {
		alert("Your application has been successfully submitted!");
	}
}
