// src/environments/environment.development.ts — el que se usa en `development`.
// `angular.json` reemplaza `environment.ts` por ESTE archivo cuando la configuración es
// `development` (via `fileReplacements`), así que no es decorativo.
export const environment = {
    production: false,
    supabase: {
        url: 'URL_DE_SUPABASE_AQUI',
        key: 'ANON_KEY_DE_SUPABASE_AQUI'
    }
};
