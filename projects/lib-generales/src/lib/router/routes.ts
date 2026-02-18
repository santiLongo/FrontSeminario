import { Routes } from '@angular/router';

export const GeneralesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../router/router').then((m) => m.RouterGeneralesComponent),
    data: { title: 'Generales' },
    children: [
      {
        path: 'gestion-localidad',
        loadChildren: () =>
          import('../localidades/router/routes').then((m) => m.LocalidadRoutes),
      },
      {
        path: 'gestion-camiones',
        loadChildren: () =>
          import('../camiones/router/routes').then((m) => m.CamionesRoutes),
      },
    ],
  },
];
