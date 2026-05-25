import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { FinanzasLibService } from '../../config/finanzas.service';
import { ReciboGridModel } from '../models/grid-model';
import { ReciboFilterModel } from '../models/filter-model';
import { GetReciboResponse } from '../dialog/detalle/models/detalle-recibo-model';
import { CrearReciboModel } from '../dialog/crear/models/crear-recibo-model';

@Injectable({
    providedIn: 'root',
})
export class RecibosHttpService {
    private url = '';

    constructor(private config: FinanzasLibService, private http: ApiHttpService) {
        this.url = config.apiUrl + 'v1/recibos/';
    }

    getAll(command: ReciboFilterModel, state: GridState): Observable<PagedResult<ReciboGridModel>> {
        return this.http.getState(this.url + 'getAll', command, state);
    }

    get(idRecibo: number): Observable<GetReciboResponse> {
        return this.http.getWithBlock(this.url + 'get', { idRecibo });
    }

    add(command: CrearReciboModel): Observable<number> {
        return this.http.postWithBlock(this.url + 'add', command);
    }

    anular(idRecibo: number): Observable<void> {
        return this.http.postWithBlock(this.url + 'anular', { idRecibo });
    }
}
