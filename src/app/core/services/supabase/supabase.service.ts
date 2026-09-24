import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase?: SupabaseClient;

  // The client is created on first use rather than on construction.
  // environment.ts currently ships placeholder credentials and createClient
  // rejects a malformed URL, so building the client eagerly makes injecting
  // this service throw and take down whatever injected it. Failing on use
  // instead keeps a missing configuration a local problem.
  get client(): SupabaseClient {
    this.supabase ??= createClient(
      environment.supabase.url,
      environment.supabase.key
    );

    return this.supabase;
  }
}
