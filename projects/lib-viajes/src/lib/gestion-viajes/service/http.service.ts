import { Injectable } from "@angular/core";
import { ApiHttpService, GridState, PagedResult } from "lib-core";
import { ViajesLibService } from "lib-viajes";
import { GestionViajesFilterModel } from "../models/filter-model";
import { Observable } from "rxjs";
import { GestionViajesGridModel } from "../models/grid-model";
import { ForzarEstadoModel } from "../dialogs/forzar-estado/models/forzar-estado-model";
import { InformarDescargaModel } from "../dialogs/informar-descarga/models/informar-descarga-model";

@Injectable({
    providedIn: "root",
})
export class GestionViajesHttpService {
    private url = '';
    
    constructor(private config: ViajesLibService, private http: ApiHttpService) {
        this.url = this.config.apiUrl + 'v1/viaje/';
    }

    getAll(command: GestionViajesFilterModel, state: GridState): Observable<PagedResult<GestionViajesGridModel>> {
        const fullUrl = this.url + 'getAll';
        return this.http.getState(fullUrl, command, state);
    }

    forzarEstado(command: ForzarEstadoModel): Observable<void> {
        const fullUrl = this.url + 'forzar-estado';
        return this.http.postWithBlock(fullUrl, command);
    }

    informarDescarga(command: InformarDescargaModel): Observable<void> {
        const fullUrl = this.url + 'cargar-descarga';
        return this.http.postWithBlock(fullUrl, command);
    }
}