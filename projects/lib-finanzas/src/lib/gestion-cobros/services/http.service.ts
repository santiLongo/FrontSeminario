import { Injectable } from "@angular/core";
import { FinanzasLibService } from "../../config/finanzas.service";
import { ApiHttpService, GridState, HttpRef, PagedResult } from "lib-servicios";
import { CobrosFilterModel } from "../models/cobros-filter-model";
import { Observable } from "rxjs";
import { CobrosGridModel } from "../models/cobros-grid-model";
import { UpdateCobroModel } from "../dialogs/update-cobro/model/update-cobro-model";

@Injectable({
    providedIn: 'root'
})
export class CobrosHttpService {
    private url = '';

    constructor(private config: FinanzasLibService, private http: ApiHttpService) {
        this.url = config.apiUrl + 'v1/cobros/'
    }

    getAll(command: CobrosFilterModel, state: GridState, ref: HttpRef): Observable<PagedResult<CobrosGridModel>> {
        const fullUrl = this.url + 'getAll';
        return this.http.getState(fullUrl, command, state, ref);
    }

    update(command: UpdateCobroModel): Observable<void> {
        const fullUrl = this.url + 'update';
        return this.http.postWithBlock(fullUrl, command);
    }

    get(idCobro: number): Observable<UpdateCobroModel> {
        const fullUrl = this.url + 'get';
        return this.http.getWithBlock(fullUrl, {idCobro});
    }

    anular(idCobro: number): Observable<void> {
        const fullUrl = this.url + 'anular';
        return this.http.postWithBlock(fullUrl, {idCobro});
    }
}