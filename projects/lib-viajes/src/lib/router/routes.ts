import { Routes } from '@angular/router';
import { ViajesDashboardComponent } from '../dashboard/dashboard';

export const ViajesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../router/router').then(m => m.RouterViajesComponent),
        data: { title: 'Viajes' },
        children: [
            {
                path: '',
                component: ViajesDashboardComponent
            },
            {
                path: 'gestion-viajes',
                loadChildren: () => import('../gestion-viajes/router/routes').then(m => m.GestionViajesRoutes),
            },
            {
                path: 'gestion-choferes',
                loadChildren: () => import('../choferes/router/routes').then(m => m.ChoferesRoutes),
            },
        ]
    }

];