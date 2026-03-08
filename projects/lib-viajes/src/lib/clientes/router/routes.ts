import { Routes } from '@angular/router';

export const ClientesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./router').then((m) => m.ClienteRouterComponent),
    data: {
      title: 'Clientes',
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../view/clientes').then((m) => m.ClientesComponent),
      },
    ],
  },
];
