import { MediaMatcher } from "@angular/cdk/layout";
import { Component, OnDestroy, OnInit, inject, signal } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "./services/auth.service";
import { SignInDialogComponent } from "./dialogs/sign-in-dialog/sign-in-dialog.component";

import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NotificationsService } from "./services/notifications.service";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { filter } from "rxjs";

@Component({
	selector: "app-root",
	imports: [
    RouterLink,
    RouterLinkActive,
		RouterOutlet,
		FooterComponent,
		MatToolbarModule,
    MatMenuModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
    MatDividerModule,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit, OnDestroy {
  readonly signInDialog = inject(MatDialog);
  private router = inject(Router);
  matIconRegistry = inject(MatIconRegistry);
  domSanitizer = inject(DomSanitizer);
  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);

  navItems = [
    { name: "Home", route: "/home", icon: "home_outlined" },
    { name: "Requirements", route: "/requirements", icon: "check_circle_outline" },
    { name: "Participants", route: "/participants", icon: "people" },
  ];

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
    this.matIconRegistry.addSvgIcon(
      "github",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/icons/github.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "linkedin",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/icons/linkedin.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "x",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/icons/x.svg")
    );
	}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const path = this.router.url;
      if (path === "/apply") {
        setTimeout(() => {
        localStorage.removeItem("apply");
        }, 1000);
      }
    });
  }

  onSignIn(apply?: boolean) {
    this.signInDialog.open(SignInDialogComponent);
    if (apply) {
      localStorage.setItem("apply", "true");
    } else {
      localStorage.removeItem("apply");
    }
  }

  onLogout() {
		this.authService.signOut();
		this.notificationsService.success("You have been logged out!");
	}

	ngOnDestroy(): void {
		this._mobileQuery.removeEventListener("change", this._mobileQueryListener);
	}
}
