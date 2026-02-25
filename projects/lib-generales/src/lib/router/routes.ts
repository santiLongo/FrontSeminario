import { Routes } from '@angular/router';
import { GeneralesDashboardComponent } from '../dashboard/dashboard';

export const GeneralesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../router/router').then((m) => m.RouterGeneralesComponent),
    data: { title: 'Generales' },
    children: [
      {
        path: '',
        component: GeneralesDashboardComponent,
      },
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
