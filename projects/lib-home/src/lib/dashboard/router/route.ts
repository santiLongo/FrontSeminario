import { Routes } from "@angular/router";
import { DashboardHomeComponent } from "../view/dashboard.component";

export const DashboardRoute : Routes = [
    {
        path: '',
        component: DashboardHomeComponent
    }
]