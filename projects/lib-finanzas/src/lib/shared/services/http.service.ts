import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { FinanzasLibService } from '../../config/finanzas.service';
import { GetFacturaEmitidaResponse } from '../components/detalle-facturas-emitidas/models/model';
import { GetFacturaRecibidaResponse } from '../components/detalle-facturas-recibidas/models/model';

@Injectable({ providedIn: 'root' })
export class FinanzasHttpService {
    private urlFacturasEmitadas = '';
    private urlFacturasRecibidas = '';

    constructor(private config: FinanzasLibService, private http: ApiHttpService) {
        this.urlFacturasEmitadas = config.apiUrl + 'v1/facturas-emitidas/';
        this.urlFacturasRecibidas = config.apiUrl + 'v1/facturas-recibidas/';
    }

    getRecibida(idFactura: number): Observable<GetFacturaRecibidaResponse> {
        return this.http.getWithBlock(this.urlFacturasRecibidas + 'get', { idFactura });
    }

    getEmitidas(idFactura: number): Observable<GetFacturaEmitidaResponse> {
        return this.http.getWithBlock(this.urlFacturasEmitadas + 'get', { idFactura });
    }

    anularRecibida(idFactura: number): Observable<void> {
        return this.http.postWithBlock(this.urlFacturasRecibidas + 'anular', { idFactura });
    }

    anularEmitida(idFactura: number): Observable<void> {
        return this.http.postWithBlock(this.urlFacturasEmitadas + 'anular', { idFactura });
    }
}
