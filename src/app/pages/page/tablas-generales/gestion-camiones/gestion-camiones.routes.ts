import { Routes } from "@angular/router";
import { GestionCamionesRouterComponent } from "./gestion-camiones-router.component";
import { GestionCamionesComponent } from "./views/gestion-camiones.component";

export const GestionCamionesRoutes: Routes = [
    {
        path: '',
        component: GestionCamionesRouterComponent,
        children: [
            {
                path: '',
                component:GestionCamionesComponent,
            }
        ]
    }
];