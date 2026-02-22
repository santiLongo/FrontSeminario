import { Routes } from '@angular/router'

export const MantenimientoRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.MantenimientoRouterComponent),
        data: {
            title: 'Mantenimiento'
        },
        children: [
            {
                path: 'talleres',
                loadChildren: () => import('../talleres/router/routes').then(m => m.LocalidadRoutes)
            }
        ]
    }
]