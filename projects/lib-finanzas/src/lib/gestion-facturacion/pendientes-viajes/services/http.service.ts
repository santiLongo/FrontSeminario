import { Injectable } from '@angular/core';
import { ApiHttpService } from 'lib-core';
import { Observable } from 'rxjs';
import { FinanzasLibService } from '../../../config/finanzas.service';
import { ViajesPendienteGridModel } from '../models/grid-model';
import { GenerarFacturaViajeModel } from '../dialog/generar/models/model';

@Injectable({ providedIn: 'root' })
export class PendientesViajesHttpService {
    private url = '';

    constructor(private config: FinanzasLibService, private http: ApiHttpService) {
        this.url = config.apiUrl + 'v1/pendientes-facturacion/';
    }

    getAll(): Observable<ViajesPendienteGridModel[]> {
        return this.http.get<ViajesPendienteGridModel[]>(this.url + 'viajes');
    }

    generar(idViaje: number, command: GenerarFacturaViajeModel): Observable<number> {
        return this.http.postWithBlock(`${this.url}viajes/${idViaje}/generar`, command);
    }
}
