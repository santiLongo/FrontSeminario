import { Injectable } from "@angular/core";
import { ApiHttpService, GridState, PagedResult } from "lib-core";
import { GeneralesLibService } from "lib-generales";
import { CamionesFilterModel } from "../models/camiones-filter-model";
import { Observable } from "rxjs";
import { CamionesGridModel } from "../models/camiones-grid-model";
import { UpsertCamionModel } from "../dialog/models/upsert-model";

@Injectable({
    providedIn: 'root'
})
export class CamionesHttpService {
    private url = '';
    
    constructor(private config: GeneralesLibService, private http: ApiHttpService) 
    {
        this.url = config.apiUrl + 'v1/camion/';
    }

    getAll(command: CamionesFilterModel, state: GridState): Observable<PagedResult<CamionesGridModel>> {
        const fullUrl = this.url + 'getAll';
        return this.http.getState(fullUrl, command, state);
    }

    get(id: number): Observable<UpsertCamionModel> {
        const fullUrl = this.url + `get`;
        return this.http.get(fullUrl, { id });
    }

    upsert(command: UpsertCamionModel): Observable<void> {
        const fullUrl = this.url + `upsert`;
        return this.http.post(fullUrl, command);
    }

    darBaja(id: number): Observable<void> {
        const fullUrl = this.url + `dar-baja`;
        return this.http.postWithBlock(fullUrl, { id });
    }

    darAlta(id: number): Observable<void> {
        const fullUrl = this.url + `dar-alta`;
        return this.http.postWithBlock(fullUrl, { id });
    }
}