import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Page } from './page';

export const pageRoutes: Routes = [
  {
    path: '',
    component: Page,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'viajes',
        loadChildren: () =>
          import('./viajes/viajes.routes').then((m) => m.viajesRoutes),
      },
    ],
  },
];
