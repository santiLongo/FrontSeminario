import { Routes } from "@angular/router";

export const GestionViajesRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.RouterGestionViajesComponent),
        data: { title: 'Gestión de Viajes' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/gestion-viajes').then(m => m.GestionViajesComponent),
                data: { title: '' },
            },
            {
                path: 'formulario',
                loadChildren: () => import('../../formulario-viaje/router/routes').then(m => m.FormularioViajesRoutes),
            },
            {
                path: 'formulario/:idViaje/:readonly',
                loadChildren: () => import('../../formulario-viaje/router/routes').then(m => m.FormularioViajesRoutes),
            }
        ]
    }
]