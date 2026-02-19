import { Routes } from "@angular/router";

export const ChoferesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../router/router').then(m => m.ChoferesRouterComponent),
        data: { title: 'Choferes' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/choferes').then(m => m.ChoferesComponent),
            }
        ]
    }
]