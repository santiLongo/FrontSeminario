import { Routes } from '@angular/router';
import { GestionChoferesRouterComponent } from "./gestion-choferes-router.component";
import { GestionChoferesComponent } from "./views/gestion-choferes.component";

export const GestionChoferesRoutes: Routes = [
    {
        path: '',
        component: GestionChoferesRouterComponent,
        children: [
            {
                path: '',
                component: GestionChoferesComponent,
            },
        ]
    }
];