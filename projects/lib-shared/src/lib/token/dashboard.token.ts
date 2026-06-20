import { InjectionToken } from "@angular/core";
import { Cards } from "lib-core";
import { Observable } from "rxjs";

export interface IDashboardService {
    getDashboard(dashboard: string): Observable<Cards[]>;
}

export const DASHBOARD = new InjectionToken<IDashboardService>('DASHBOARD');