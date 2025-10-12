import { Routes } from '@angular/router';
import { TablasGeneralesRouterComponent } from "./tablas-generales.component";
import { TablasGeneralesDashboard } from "./dashboard/tablas-generales-dashboard.component";

export const TablasGeneralesRoutes: Routes = [
    {
        path: '',
        component: TablasGeneralesRouterComponent,
        children: [
            {
                path: '',
                component: TablasGeneralesDashboard,
            },
            {
                path: 'gestion-choferes',
                loadChildren: () =>
                    import('./gestion-choferes/gestion-choferes.routes').then((m) => m.GestionChoferesRoutes),
            },
            {
                path: 'gestion-camiones',
                loadChildren: () =>
                    import('./gestion-camiones/gestion-camiones.routes').then((m) => m.GestionCamionesRoutes),
            }
        ]
    }
];