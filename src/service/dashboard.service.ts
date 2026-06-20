import { ApiHttpService, Cards } from "lib-core";
import { Observable } from "rxjs";
import { AppConfigService } from "./config.service";
import { IDashboardService } from 'lib-shared'
import { Injectable } from "@angular/core";

@Injectable() 
export class DashboardService implements IDashboardService {
    
    private url: string = ''

    constructor(config: AppConfigService, private http: ApiHttpService){
        this.url = config.url + 'v1/home/'
    }
    
    getDashboard(dashboard: string): Observable<Cards[]> {
        const fullUrl = this.url + 'getDashboard';
        return this.http.getWithBlock(fullUrl, {dashboardName: dashboard });
    }

}