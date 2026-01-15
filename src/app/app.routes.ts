import { Title } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/guard/auth.guard';
import { HomeComponent } from 'src/home/view/home.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('lib-home').then(m => m.LoginComponent),
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {
                    title: 'Home'
                },
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('lib-home').then(m => m.DashboardHomeComponent),
            },
            {
                path: 'viajes',
                loadChildren: () => import('lib-viajes').then(m => m.ViajesRoutes)
            },
            {
                path: 'configuracion',
                loadChildren: () => import('lib-config').then(m => m.ConfiguracionRoutes)
            }
        ]
    },
    {
        path: '**',
        canActivate: [AuthGuard],
        loadComponent: () => import('lib-home').then(m => m.NotFoundComponent)
    }
];
