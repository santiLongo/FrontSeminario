import { Injectable } from '@angular/core';
import { BaseGridService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { PendienteConfirmarGridModel } from '../models/grid-model';
import { PendientesConfirmarHttpService } from './http.service';

@Injectable()
export class PendientesConfirmarDataService extends BaseGridService<PendienteConfirmarGridModel> {
    constructor(private httpService: PendientesConfirmarHttpService) {
        super();
    }

    override getData(state: GridState): Observable<PagedResult<PendienteConfirmarGridModel>> {
        return this.httpService.getAll(state);
    }

    delete(idFactura: number, tipo: number): Observable<void> {
        return this.httpService.delete(idFactura);
    }
}
