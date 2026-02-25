import { Routes } from '@angular/router';
import { MantenimientoDashboardComponent } from '../dashboard/dashboard';

export const MantenimientoRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./router').then((m) => m.MantenimientoRouterComponent),
    data: {
      title: 'Mantenimiento',
    },
    children: [
      {
        path: '',
        component: MantenimientoDashboardComponent,
      },
      {
        path: 'talleres',
        loadChildren: () =>
          import('../talleres/router/routes').then((m) => m.TalleresRoutes),
      },
      {
        path: 'proveedores',
        loadChildren: () =>
          import('../proveedores/router/routes').then(
            (m) => m.ProveedoresRoutes,
          ),
      },
      {
        path: 'gestion-mantenimiento',
        loadChildren: () =>
          import('../mantenimiento/router/routes').then(
            (m) => m.MantenimientoRoutes,
          ),
      },
    ],
  },
];
