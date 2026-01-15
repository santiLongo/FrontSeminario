import { Routes } from '@angular/router';

export const ConfiguracionRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../router/router').then(m => m.RouterConfigComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('../home/home').then(m => m.HomeConfigComponent),
                 data: { title: 'Configuracion' },
            }
        ]
    }

];