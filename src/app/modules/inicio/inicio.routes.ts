import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../guards/auth.guard';
import { InicioComponent } from './inicio.component';

export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: 
    [
        { 
            path: 'dashboard',
            component: DashboardComponent,
            canActivateChild: [AuthGuard],
        } 
    ]
  }
];
