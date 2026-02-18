import { Routes } from "@angular/router";

export const CamionesRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.CamionRouterComponent),
        data: { title: 'Camiones' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/camion').then(m => m.CamionComponent),
            }
        ]
    }
]