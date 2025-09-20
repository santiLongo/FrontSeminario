import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { InicioComponent } from './modules/inicio/inicio.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

export const routes: Routes = [
    { 
        path: '', 
        component: Login,
    },
    { 
        path: 'inicio', 
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/inicio/inicio.routes').then(m => m.routes)
    },
    { 
        path: '**', 
        component: PageNotFoundComponent,
    }
];
