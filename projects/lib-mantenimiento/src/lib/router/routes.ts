import { Routes } from '@angular/router'

export const MantenimientoRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.MantenimientoRouterComponent)
    }
]