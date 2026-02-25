import { Injectable } from "@angular/core";
import { HomeLibService } from "../../config/home.service";
import { ApiHttpService } from "lib-core";
import { Observable } from "rxjs";
import { GetAllEventosCommand, GetAllEventosResponse } from "../models/get-all-eventos";

@Injectable({
    providedIn: 'root'
})
export class HomeHttpService {
    private urlControl = '';
    private urlEvents = '';

    constructor(private config: HomeLibService, private http: ApiHttpService){
        this.urlControl = config.loginUrl + 'v1/control-group/'
        this.urlEvents = config.loginUrl + 'v1/eventos/'
    }

    get(): Observable<any>{
        const fullUrl = this.urlControl + 'get';
        return this.http.get(fullUrl, null);
    }

    getEvents(command: GetAllEventosCommand): Observable<Array<GetAllEventosResponse>>{
        const fullUrl = this.urlEvents + 'getAll';
        return this.http.get(fullUrl, command);
    }
}