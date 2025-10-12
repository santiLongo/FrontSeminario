import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Page } from './page';
import { AuthGuard } from '../../guards/auth.guard';

export const pageRoutes: Routes = [
  {
    path: '',
    component: Page,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: Home,
        canActivateChild: [AuthGuard],
      },
      {
        path: 'viajes',
        loadChildren: () =>
          import('./viajes/viajes.routes').then((m) => m.viajesRoutes),
      },
      {
        path: 'tablas-generales',
        loadChildren: () =>
          import('./tablas-generales/tablas-generales.routes').then((m) => m.TablasGeneralesRoutes),
      },
    ],
  },
];
