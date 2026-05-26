import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { FinanzasLibService } from '../../../config/finanzas.service';
import { FacturaRecibidaGridModel } from '../models/grid-model';
import { FacturaRecibidaFilterModel } from '../models/filter-model';
import { GetFacturaRecibidaResponse } from '../../../shared/components/detalle-facturas-recibidas/models/model';
import { CrearRecibidaModel } from '../dialog/crear/models/model';
import { ConfirmarRecibidaModel } from '../../pendientes-confirmar/dialog/confirmar/models/model';
import { UpdateRecibidaModel } from '../../pendientes-confirmar/dialog/editar-recibida/models/model';

@Injectable({ providedIn: 'root' })
export class FacturasRecibidasHttpService {
    private url = '';

    constructor(private config: FinanzasLibService, private http: ApiHttpService) {
        this.url = config.apiUrl + 'v1/facturas-recibidas/';
    }

    getAll(command: FacturaRecibidaFilterModel, state: GridState): Observable<PagedResult<FacturaRecibidaGridModel>> {
        return this.http.getState(this.url + 'getAll', command, state);
    }

    add(command: CrearRecibidaModel): Observable<number> {
        return this.http.postWithBlock(this.url + 'add', command);
    }

    anular(idFactura: number): Observable<void> {
        return this.http.postWithBlock(this.url + 'anular', { idFactura });
    }

    confirmar(idFactura: number, command: ConfirmarRecibidaModel): Observable<void> {
        return this.http.postWithBlock(`${this.url}${idFactura}/confirmar`, command);
    }

    update(idFactura: number, command: UpdateRecibidaModel): Observable<void> {
        return this.http.putWithBlock(`${this.url}${idFactura}`, command);
    }
}
