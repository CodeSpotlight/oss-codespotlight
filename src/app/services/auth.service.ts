import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import {
	SupabaseClient,
	User,
	AuthChangeEvent,
	Session,
} from "@supabase/supabase-js";
import { SupabaseService } from "./supabase.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private supabase: SupabaseClient;
	user = signal<User | null>(null);
	username = signal<string | null>(null);
	avatar = signal<string | null>(null);
	router = inject(Router);
	http = inject(HttpClient);

	constructor(supabaseService: SupabaseService) {
		this.supabase = supabaseService.getClient();

		this.supabase.auth.onAuthStateChange(
			(event: AuthChangeEvent, session: Session | null) => {
				if (session && session.user) {
					this.user.set(session.user);
					const emailToUsername = session.user.email
						? session.user.email.split("@")[0]
						: "";
					this.username.set(emailToUsername);
					this.avatar.set(this.user()?.user_metadata["avatar_url"]);
          if (localStorage.getItem("apply")) {
            this.router.navigate(["/apply"]);
          } else {
					this.router.navigate(["/dashboard"]);
          }
				} else {
					this.user.set(null);
					this.username.set(null);
					this.avatar.set(null);
          localStorage.removeItem("apply");
					this.router.navigate(["/"]);
				}
			}
		);
	}

	async signInWithGithub() {
		await this.supabase.auth.signInWithOAuth({ provider: "github" });
	}

	async signInWithGoogle() {
		await this.supabase.auth.signInWithOAuth({ provider: "google" });
	}

	async signInWithGitlab() {
		await this.supabase.auth.signInWithOAuth({ provider: "gitlab" });
	}

	async signOut() {
		await this.supabase.auth.signOut();
    localStorage.removeItem("apply");
		this.router.navigate(["/"]);
	}
}
