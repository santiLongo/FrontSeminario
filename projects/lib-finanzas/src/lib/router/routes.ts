import { Routes } from '@angular/router'
import { FiananzasDashboardComponent } from '../dashboard/dashboard'

export const FinanzasRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.FinanazasRouterComponent),
        data: {
            title: 'Finanzas'
        },
        children: [
            {
                path: '',
                component: FiananzasDashboardComponent
            },
            {
                path: 'gestion-cobros',
                loadChildren: () => import('../gestion-cobros/router/routes').then(m => m.GestionCobrosRoutes)
            }
        ]
    }
]