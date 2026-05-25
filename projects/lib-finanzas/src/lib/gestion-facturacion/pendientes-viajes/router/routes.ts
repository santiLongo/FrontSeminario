import { Routes } from '@angular/router';
import { PendientesViajesComponent } from '../view/pendientes-viajes';

export const PendientesViajesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then((m) => m.PendientesViajesRouterComponent),
        data: { title: 'Pendientes de Viajes' },
        children: [
            {
                path: '',
                component: PendientesViajesComponent,
            },
        ],
    },
];
