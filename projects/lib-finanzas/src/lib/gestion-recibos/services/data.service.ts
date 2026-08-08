import { Injectable } from '@angular/core';
import { BaseGridService } from 'lib-components';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ReciboGridModel } from '../models/grid-model';
import { RecibosHttpService } from './http.service';
import { ReciboFilterModel } from '../models/filter-model';
import { GridState, HttpRef, PagedResult } from 'lib-servicios';

@Injectable()
export class RecibosDataService extends BaseGridService<ReciboGridModel> {
    public tipoRecibo: FormControl = new FormControl(null);

    constructor(private httpService: RecibosHttpService) {
        super();
    }

    override getData(state: GridState, ref: HttpRef): Observable<PagedResult<ReciboGridModel>> {
        const command: ReciboFilterModel = {
            tipoRecibo: this.tipoRecibo.value ?? undefined,
        };
        return this.httpService.getAll(command, state, ref);
    }

    anular(idRecibo: number): Observable<void> {
        return this.httpService.anular(idRecibo);
    }
}
