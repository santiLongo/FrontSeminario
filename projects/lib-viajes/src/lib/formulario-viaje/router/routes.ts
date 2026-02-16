import { Routes } from "@angular/router";

export const FormularioViajesRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.FormularioViajeRouterComponent),
        data: { title: 'Formulario'},
        children: [
            {
                path: '',
                loadComponent: () => import('../view/formulario-viaje').then(m => m.FormularioViajeComponent)
            }
        ]
    }
]