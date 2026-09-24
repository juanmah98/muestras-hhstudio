import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'apro-clinica',
    loadComponent: () =>
      import('./pages/apro-clinica/apro-clinica.component').then(
        (m) => m.AproClinicaComponent,
      ),
  },
  {
    path: 'salud',
    loadComponent: () =>
      import('./pages/salud/salud.component').then(
        (m) => m.SaludComponent,
      ),
  },
  {
    path: 'carpinteria',
    loadComponent: () =>
      import('./pages/carpinteria/carpinteria.component').then(
        (m) => m.CarpinteriaComponent,
      ),
  },
  {
    path: 'reformas',
    loadComponent: () =>
      import('./pages/reformas/reformas.component').then(
        (m) => m.ReformasComponent,
      ),
  },
  {
    path: 'electricista',
    loadComponent: () =>
      import('./pages/electricista/electricista.component').then(
        (m) => m.ElectricistaComponent,
      ),
  },
  {
    path: 'estetica',
    loadComponent: () =>
      import('./pages/estetica/estetica.component').then(
        (m) => m.EsteticaComponent,
      ),
  },
  {
    path: 'pasteleria',
    loadComponent: () =>
      import('./pages/pasteleria/pasteleria.component').then(
        (m) => m.PasteleriaComponent,
      ),
  },
  {
    path: 'blackbird-cafe',
    loadComponent: () =>
      import('./pages/blackbird-cafe/blackbird-cafe.component').then(
        (m) => m.BlackbirdCafeComponent,
      ),
  },
  {
    path: 'seo-ia',
    loadComponent: () =>
      import('./pages/seo-ia/seo-ia.component').then(
        (m) => m.SeoIaComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
