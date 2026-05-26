import { Routes } from '@angular/router';

export const PendientesConfirmarRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then((m) => m.PendientesConfirmarRouterComponent),
        data: { title: 'Pendientes de Confirmar' },
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('../view/pendientes-confirmar').then((m) => m.PendientesConfirmarComponent),
            },
        ],
    },
];
