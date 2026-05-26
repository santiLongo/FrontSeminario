import { Injectable } from '@angular/core';
import { BaseGridService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { FacturaEmitidaGridModel } from '../models/grid-model';
import { FacturasEmitidasHttpService } from './http.service';
import { FacturaEmitidaFilterModel } from '../models/filter-model';

@Injectable()
export class FacturasEmitidasDataService extends BaseGridService<FacturaEmitidaGridModel> {
    constructor(private httpService: FacturasEmitidasHttpService) {
        super();
    }

    override getData(state: GridState): Observable<PagedResult<FacturaEmitidaGridModel>> {
        const command: FacturaEmitidaFilterModel = { confirmada: true };
        return this.httpService.getAll(command, state);
    }

    anular(idFactura: number): Observable<void> {
        return this.httpService.anular(idFactura);
    }
}
