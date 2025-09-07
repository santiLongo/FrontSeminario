import { Routes } from '@angular/router';
import { Home } from './home/home';
import { User } from './user/user';
import { About } from './about/about';
import { AuthGuard } from '../../guards/auth.guard';


export const pageRoutes: Routes = [
    { path: 'home', component: Home, canActivateChild: [AuthGuard], },
    { path: "usuario", component: User, canActivateChild: [AuthGuard], },
    { path: "nosotros", component: About, canActivateChild: [AuthGuard], },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
