import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { FinanzasLibService } from '../../../config/finanzas.service';
import { FacturaEmitidaGridModel } from '../models/grid-model';
import { FacturaEmitidaFilterModel } from '../models/filter-model';
import { CrearEmitidaConViajeModel } from '../dialog/crear-con-viaje/models/model';
import { CrearEmitidaSinViajeModel } from '../dialog/crear-sin-viaje/models/model';
import { ViajesPendienteItem } from '../dialog/crear-con-viaje/models/model';
import { ConfirmarEmitidaModel } from '../dialog/confirmar/models/model';
import { UpdateEmitidaModel } from '../../pendientes-confirmar/dialog/editar-emitida/models/model';

@Injectable({ providedIn: 'root' })
export class FacturasEmitidasHttpService {
    private url = '';
    private pendientesUrl = '';

    constructor(private config: FinanzasLibService, private http: ApiHttpService) {
        this.url = config.apiUrl + 'v1/facturas-emitidas/';
        this.pendientesUrl = config.apiUrl + 'v1/pendientes-facturacion/';
    }

    getAll(command: FacturaEmitidaFilterModel, state: GridState): Observable<PagedResult<FacturaEmitidaGridModel>> {
        return this.http.getState(this.url + 'getAll', command, state);
    }

    addConViaje(command: CrearEmitidaConViajeModel): Observable<number> {
        return this.http.postWithBlock(this.url + 'add-con-viaje', command);
    }

    addSinViaje(command: CrearEmitidaSinViajeModel): Observable<number> {
        return this.http.postWithBlock(this.url + 'add-sin-viaje', command);
    }

    anular(idFactura: number): Observable<void> {
        return this.http.postWithBlock(this.url + 'anular', { idFactura });
    }

    confirmar(idFactura: number, command: ConfirmarEmitidaModel): Observable<void> {
        return this.http.postWithBlock(`${this.url}${idFactura}/confirmar`, command);
    }

    update(idFactura: number, command: UpdateEmitidaModel): Observable<void> {
        return this.http.putWithBlock(`${this.url}${idFactura}`, command);
    }

    getViajesPendientes(): Observable<ViajesPendienteItem[]> {
        return this.http.get<ViajesPendienteItem[]>(this.pendientesUrl + 'viajes');
    }
}
