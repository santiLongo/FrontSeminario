import { Routes } from "@angular/router";

export const LocalidadRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.LocalidadRouterComponent),
        data: { title: 'Localidades' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/localidad').then(m => m.LocalidadComponent),
            }
        ]
    }
]