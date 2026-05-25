import { Routes } from '@angular/router';

export const RecibosRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then((m) => m.RecibosRouterComponent),
        data: { title: 'Recibos' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/recibos').then((m) => m.RecibosComponent),
            },
        ],
    },
];
