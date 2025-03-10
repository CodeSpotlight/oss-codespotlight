import { Injectable } from '@angular/core';
import {
	SupabaseClient,
	createClient,
} from "@supabase/supabase-js";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
