import { Routes } from "@angular/router";

export const TalleresRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.TalleresRouterComponent),
        data: { title: 'Talleres' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/talleres').then(m => m.TalleresComponent),
            }
        ]
    }
]