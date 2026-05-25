import { Injectable } from '@angular/core';
import { ApiHttpService } from 'lib-core';
import { Observable } from 'rxjs';
import { FinanzasLibService } from '../../../config/finanzas.service';
import { MantenimientoPendienteGridModel } from '../models/grid-model';
import { GenerarFacturaMantenimientoModel } from '../dialog/generar/models/model';

@Injectable({ providedIn: 'root' })
export class PendientesMantenimientosHttpService {
    private url = '';

    constructor(private config: FinanzasLibService, private http: ApiHttpService) {
        this.url = config.apiUrl + 'v1/pendientes-facturacion/';
    }

    getAll(): Observable<MantenimientoPendienteGridModel[]> {
        return this.http.get<MantenimientoPendienteGridModel[]>(this.url + 'mantenimientos');
    }

    generar(idMantenimiento: number, command: GenerarFacturaMantenimientoModel): Observable<number> {
        return this.http.postWithBlock(`${this.url}mantenimientos/${idMantenimiento}/generar`, command);
    }
}
