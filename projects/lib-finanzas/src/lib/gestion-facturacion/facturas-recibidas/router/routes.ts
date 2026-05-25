import { Routes } from '@angular/router';
import { FacturasRecibidasComponent } from '../view/facturas-recibidas';

export const FacturasRecibidasRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then((m) => m.FacturasRecibidasRouterComponent),
        data: { title: 'Facturas Recibidas' },
        children: [
            {
                path: '',
                component: FacturasRecibidasComponent,
            },
        ],
    },
];
