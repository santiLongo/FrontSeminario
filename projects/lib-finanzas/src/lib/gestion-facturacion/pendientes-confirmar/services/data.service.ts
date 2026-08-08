import { Injectable } from '@angular/core';
import { BaseGridService } from 'lib-components';
import { Observable } from 'rxjs';
import { PendienteConfirmarGridModel } from '../models/grid-model';
import { PendientesConfirmarHttpService } from './http.service';
import { GridState, HttpRef, PagedResult } from 'lib-servicios';

@Injectable()
export class PendientesConfirmarDataService extends BaseGridService<PendienteConfirmarGridModel> {
    constructor(private httpService: PendientesConfirmarHttpService) {
        super();
    }

    override getData(state: GridState, ref: HttpRef): Observable<PagedResult<PendienteConfirmarGridModel>> {
        return this.httpService.getAll(state, ref);
    }

    delete(idFactura: number, tipo: number): Observable<void> {
        return this.httpService.delete(idFactura);
    }
}
