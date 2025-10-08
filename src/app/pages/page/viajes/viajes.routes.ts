import { Routes } from '@angular/router';
import { ViajesRouterComponent } from './viajes.router.component';
import { ViajesDashboard } from './dashboard/viajes-dashboard.component';


export const viajesRoutes: Routes = [
    {
        path: '',
        component: ViajesRouterComponent,
        children: [
            {
                path: '',
                component: ViajesDashboard,
            },
            {
                path: 'clientes',
                loadChildren: () =>
                    import('./clientes/clientes.routes').then((m) => m.clientesRoutes),
            }
        ]
    }
];
