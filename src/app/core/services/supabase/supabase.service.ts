import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Inicializamos el cliente de Supabase usando nuestras variables de entorno
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  // Getter público para acceder al cliente desde otros componentes
  get client(): SupabaseClient {
    return this.supabase;
  }
}