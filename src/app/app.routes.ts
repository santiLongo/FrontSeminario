import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Page } from './pages/page/page';
import { AuthGuard } from './guards/auth.guard';
import { pageRoutes } from './pages/page/page.routes';

export const routes: Routes = [
    { 
        path: '', 
        component: Login 
    },
    { 
        path: 'page', 
        component: Page,
        canActivate: [AuthGuard],
        children: pageRoutes,
    },
    { 
        path: '**', 
        redirectTo: '' 
    }
];
