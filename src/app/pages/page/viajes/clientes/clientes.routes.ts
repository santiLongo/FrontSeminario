import { Routes } from '@angular/router';
import { ClientesRouterComponent } from './clientes-router.component';
import { ClientesComponent } from './views/clientes.component';


export const clientesRoutes: Routes = [
    {
        path: '',
        component: ClientesRouterComponent,
        children: [
            {
                path: '',
                component: ClientesComponent,
            }
        ]
    }
];
