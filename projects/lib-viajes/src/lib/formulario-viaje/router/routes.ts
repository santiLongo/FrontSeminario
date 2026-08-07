import { RouterModule, Routes } from "@angular/router";
import { FormularioViajeRouterComponent } from "./router";
import { FormularioViajeComponent } from "../view/formulario-viaje";

export const routes : Routes = [
    {
        path: '',
        component: FormularioViajeRouterComponent,
        data: { title: 'Formulario'},
        children: [
            {
                path: '',
                component: FormularioViajeComponent,
                data: { title: '' },
            }
        ]
    }
]

export const FormularioViajesRoutes = RouterModule.forChild(routes);