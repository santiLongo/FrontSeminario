import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { FinanzasLibService } from '../../../config/finanzas.service';
import { PendienteConfirmarGridModel } from '../models/grid-model';
import { ConfirmarFacturaModel } from '../dialog/confirmar/models/model';
import { UpdateEmitidaModel } from '../dialog/editar-emitida/models/model';
import { UpdateRecibidaModel } from '../dialog/editar-recibida/models/model';

@Injectable({ providedIn: 'root' })
export class PendientesConfirmarHttpService {
    private url = '';
    private urlEmitidas = '';
    private urlRecibidas = '';

    constructor(private config: FinanzasLibService, private http: ApiHttpService) {
        this.url = config.apiUrl + 'v1/pendientes-confirmar/';
        this.urlEmitidas = config.apiUrl + 'v1/facturas-emitidas/';
        this.urlRecibidas = config.apiUrl + 'v1/facturas-recibidas/';
    }

    getAll(state: GridState): Observable<PagedResult<PendienteConfirmarGridModel>> {
        return this.http.getState(this.url + 'getAll', {}, state);
    }

    getFactura(idFactura: number, tipo: number): Observable<any> {
        const base = tipo === 1 ? this.urlEmitidas : this.urlRecibidas;
        return this.http.getWithBlock(base + 'get', { idFactura });
    }

    confirmarEmitida(idFactura: number, command: ConfirmarFacturaModel): Observable<void> {
        return this.http.postWithBlock(`${this.urlEmitidas}${idFactura}/confirmar`, command);
    }

    confirmarRecibida(idFactura: number, command: ConfirmarFacturaModel): Observable<void> {
        return this.http.postWithBlock(`${this.urlRecibidas}${idFactura}/confirmar`, command);
    }

    updateEmitida(idFactura: number, command: UpdateEmitidaModel): Observable<void> {
        return this.http.putWithBlock(`${this.urlEmitidas}${idFactura}/update`, command);
    }

    updateRecibida(idFactura: number, command: UpdateRecibidaModel): Observable<void> {
        return this.http.putWithBlock(`${this.urlRecibidas}${idFactura}/update`, command);
    }

    anularEmitida(idFactura: number): Observable<void> {
        return this.http.postWithBlock(this.urlEmitidas + 'anular', { idFactura });
    }

    anularRecibida(idFactura: number): Observable<void> {
        return this.http.postWithBlock(this.urlRecibidas + 'anular', { idFactura });
    }
    
    delete(idFactura: number): Observable<void> {
        return this.http.postWithBlock(this.url + 'delete', { idFactura });
    }
}
