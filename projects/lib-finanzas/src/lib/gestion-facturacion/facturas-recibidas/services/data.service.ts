import { Injectable } from '@angular/core';
import { BaseGridService } from 'lib-components';
import { Observable } from 'rxjs';
import { FacturaRecibidaGridModel } from '../models/grid-model';
import { FacturasRecibidasHttpService } from './http.service';
import { FacturaRecibidaFilterModel } from '../models/filter-model';
import { GridState, HttpRef, PagedResult } from 'lib-servicios';

@Injectable()
export class FacturasRecibidasDataService extends BaseGridService<FacturaRecibidaGridModel> {
    constructor(private httpService: FacturasRecibidasHttpService) {
        super();
    }

    override getData(state: GridState, ref: HttpRef): Observable<PagedResult<FacturaRecibidaGridModel>> {
        const command: FacturaRecibidaFilterModel = { confirmada: true };
        return this.httpService.getAll(command, state, ref);
    }

    anular(idFactura: number): Observable<void> {
        return this.httpService.anular(idFactura);
    }
}
