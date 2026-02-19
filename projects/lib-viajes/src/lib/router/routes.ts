import { Routes } from '@angular/router';

export const ViajesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../router/router').then(m => m.RouterViajesComponent),
        data: { title: 'Viajes' },
        children: [
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