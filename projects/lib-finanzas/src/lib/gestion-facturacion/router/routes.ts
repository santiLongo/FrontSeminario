import { Routes } from '@angular/router';
import { FacturacionDashboardComponent } from '../dashboard/dashboard';

export const FacturacionRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then((m) => m.FacturacionRouterComponent),
        data: { title: 'Facturación' },
        children: [
            {
                path: '',
                component: FacturacionDashboardComponent,
            },
            {
                path: 'facturas-emitidas',
                loadChildren: () =>
                    import('../facturas-emitidas/router/routes').then((m) => m.FacturasEmitidasRoutes),
            },
            {
                path: 'facturas-recibidas',
                loadChildren: () =>
                    import('../facturas-recibidas/router/routes').then((m) => m.FacturasRecibidasRoutes),
            },
            {
                path: 'pendientes-viajes',
                loadChildren: () =>
                    import('../pendientes-viajes/router/routes').then((m) => m.PendientesViajesRoutes),
            },
            {
                path: 'pendientes-mantenimientos',
                loadChildren: () =>
                    import('../pendientes-mantenimientos/router/routes').then(
                        (m) => m.PendientesMantenimientosRoutes,
                    ),
            },
        ],
    },
];
