import { Injectable } from "@angular/core";
import { ApiHttpService, GridState, PagedResult } from "lib-core";
import { GestionViajesFilterModel } from "../models/filter-model";
import { Observable } from "rxjs";
import { GestionViajesGridModel } from "../models/grid-model";
import { ForzarEstadoModel } from "../dialogs/forzar-estado/models/forzar-estado-model";
import { InformarDescargaModel } from "../dialogs/informar-descarga/models/informar-descarga-model";
import { ViajesLibService } from "../../config/viajes.service";
import { InformarCobroModel } from "../dialogs/informar-cobro/models/informar-cobro-model";

@Injectable({
    providedIn: "root",
})
export class GestionViajesHttpService {
    private url = '';
    private urlCobro = '';
    
    constructor(private config: ViajesLibService, private http: ApiHttpService) {
        this.url = this.config.apiUrl + 'v1/viaje/';
        this.urlCobro = this.config.apiUrl + 'v1/cobros/';
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

    altaCobro(command: InformarCobroModel): Observable<void> {
        const fullUrl = this.urlCobro + 'add';
        return this.http.postWithBlock(fullUrl, command);
    }
}