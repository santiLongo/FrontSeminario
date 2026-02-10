import { Injectable } from "@angular/core";
import { ApiHttpService } from "lib-core";
import { ViajesLibService } from "lib-viajes";
import { GestionViajesFilterModel } from "../models/filter-model";
import { Observable } from "rxjs";
import { GestionViajesGridModel } from "../models/grid-model";

@Injectable({
    providedIn: "root",
})
export class GestionViajesHttpService {
    private url = '';
    
    constructor(private config: ViajesLibService, private http: ApiHttpService) {
        this.url = this.config.apiUrl + 'v1/viaje/';
    }

    getAll(command: GestionViajesFilterModel): Observable<GestionViajesGridModel[]> {
        const fullUrl = this.url + 'getAll';
        return this.http.get(fullUrl, command);
    }
}