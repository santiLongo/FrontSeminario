import { Injectable } from '@angular/core';
import { BaseGridService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { FacturaRecibidaGridModel } from '../models/grid-model';
import { FacturasRecibidasHttpService } from './http.service';
import { FacturaRecibidaFilterModel } from '../models/filter-model';

@Injectable()
export class FacturasRecibidasDataService extends BaseGridService<FacturaRecibidaGridModel> {
    constructor(private httpService: FacturasRecibidasHttpService) {
        super();
    }

    override getData(state: GridState): Observable<PagedResult<FacturaRecibidaGridModel>> {
        const command: FacturaRecibidaFilterModel = { confirmada: true };
        return this.httpService.getAll(command, state);
    }

    anular(idFactura: number): Observable<void> {
        return this.httpService.anular(idFactura);
    }
}
