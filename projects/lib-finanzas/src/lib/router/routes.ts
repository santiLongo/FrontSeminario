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
            },
            {
                path: 'gestion-recibos',
                loadChildren: () => import('../gestion-recibos/router/routes').then(m => m.RecibosRoutes)
            },
            {
                path: 'gestion-facturacion',
                loadChildren: () => import('../gestion-facturacion/router/routes').then(m => m.FacturacionRoutes)
            }
        ]
    }
]