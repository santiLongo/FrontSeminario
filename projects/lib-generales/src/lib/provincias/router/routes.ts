import { Routes } from "@angular/router";

export const ProvinciaRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.ProvinciaRouterComponent),
        data: { title: 'Provincias' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/provincia').then(m => m.ProvinciaComponent),
            }
        ]
    }
]