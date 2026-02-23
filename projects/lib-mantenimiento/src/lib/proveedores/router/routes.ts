import { Routes } from "@angular/router";

export const ProveedoresRoutes : Routes = [
    {
        path: '',
        loadComponent: () => import('./router').then(m => m.ProveedoresRouterComponent),
        data: { title: 'Proveedores' },
        children: [
            {
                path: '',
                loadComponent: () => import('../view/proveedores').then(m => m.ProveedoresComponent),
            }
        ]
    }
]