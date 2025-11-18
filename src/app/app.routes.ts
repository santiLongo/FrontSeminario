import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AuthGuard } from './guards/auth.guard';
import { pageRoutes } from './pages/page/page.routes';

export const routes: Routes = [
    { 
        path: '', 
        component: Login 
    },
    { 
        path: 'page', 
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/page/page.routes').then((m) => m.pageRoutes),
        // loadChildren: () => pageRoutes,
    },
];
