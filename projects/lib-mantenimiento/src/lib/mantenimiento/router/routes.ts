import { Routes } from "@angular/router";

export const MantenimientoRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.MantenimientosRouterComponent),
        data: { title: 'Gestion de Mantenimientos' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/mantenimiento').then(m => m.MantenimientosComponent),
            }
        ]
    }
]