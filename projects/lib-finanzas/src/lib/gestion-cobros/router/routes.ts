import { Routes } from '@angular/router'

export const GestionCobrosRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.GestionCobrosRouterComponent),
        data: {
            title: 'Cobros'
        },
        children: [
            {
                path: '',
                loadComponent: () => import('../home/gestion-cobros').then(m => m.GestionCobrosComponent)
            }
        ]
    }
]