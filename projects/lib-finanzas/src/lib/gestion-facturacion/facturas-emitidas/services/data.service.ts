import { Injectable } from '@angular/core';
import { BaseGridService } from 'lib-components';
import { Observable } from 'rxjs';
import { FacturaEmitidaGridModel } from '../models/grid-model';
import { FacturasEmitidasHttpService } from './http.service';
import { FacturaEmitidaFilterModel } from '../models/filter-model';
import { GridState, HttpRef, PagedResult } from 'lib-servicios';

@Injectable()
export class FacturasEmitidasDataService extends BaseGridService<FacturaEmitidaGridModel> {
    constructor(private httpService: FacturasEmitidasHttpService) {
        super();
    }

    override getData(state: GridState, ref: HttpRef): Observable<PagedResult<FacturaEmitidaGridModel>> {
        const command: FacturaEmitidaFilterModel = { confirmada: true };
        return this.httpService.getAll(command, state, ref);
    }

    anular(idFactura: number): Observable<void> {
        return this.httpService.anular(idFactura);
    }
}
