import { MediaMatcher } from "@angular/cdk/layout";
import { Component, OnDestroy, inject, signal } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
	selector: "app-root",
	imports: [
    RouterLink,
		RouterOutlet,
		FooterComponent,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnDestroy {
  matIconRegistry = inject(MatIconRegistry);
  domSanitizer = inject(DomSanitizer);

	protected readonly fillerNav = Array.from(
		{ length: 5 },
		(_, i) => `Nav Item ${i + 1}`
	);

	protected readonly isMobile = signal(true);

	private readonly _mobileQuery: MediaQueryList;
	private readonly _mobileQueryListener: () => void;

	constructor() {
		const media = inject(MediaMatcher);

		this._mobileQuery = media.matchMedia("(max-width: 600px)");
		this.isMobile.set(this._mobileQuery.matches);
		this._mobileQueryListener = () =>
			this.isMobile.set(this._mobileQuery.matches);
		this._mobileQuery.addEventListener("change", this._mobileQueryListener);

    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/icons/codespotlight-logo.svg")
    );
	}

	ngOnDestroy(): void {
		this._mobileQuery.removeEventListener("change", this._mobileQueryListener);
	}
}
