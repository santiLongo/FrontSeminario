import { Routes } from '@angular/router';

export const FacturasEmitidasRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then((m) => m.FacturasEmitidasRouterComponent),
        data: { title: 'Facturas Emitidas' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/facturas-emitidas').then((m) => m.FacturasEmitidasComponent),
            },
        ],
    },
];
