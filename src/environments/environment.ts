// src/environments/environment.ts — el que se usa en `production` (default del build).
// En `development` el builder lo reemplaza por `environment.development.ts` (fileReplacements).
export const environment = {
    production: true,
    supabase: {
        url: 'URL_DE_SUPABASE_AQUI',
        key: 'ANON_KEY_DE_SUPABASE_AQUI'
    }
};