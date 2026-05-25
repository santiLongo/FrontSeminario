import { Routes } from '@angular/router';
import { PendientesMantenimientosComponent } from '../view/pendientes-mantenimientos';

export const PendientesMantenimientosRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then((m) => m.PendientesMantenimientosRouterComponent),
        data: { title: 'Pendientes de Mantenimientos' },
        children: [
            {
                path: '',
                component: PendientesMantenimientosComponent,
            },
        ],
    },
];
