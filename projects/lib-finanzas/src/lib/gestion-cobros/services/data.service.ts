import { Injectable } from "@angular/core";
import { BaseGridService } from 'lib-components'
import { CobrosGridModel } from "../models/cobros-grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { CobrosFilterModel } from "../models/cobros-filter-model";
import { CobrosHttpService } from "./http.service";
import { GridState, PagedResult } from "lib-servicios";

@Injectable()
export class CobrosDataService extends BaseGridService<CobrosGridModel> {
    filterSub$ = new BehaviorSubject<CobrosFilterModel>({})

    constructor(private httpServie: CobrosHttpService){
        super()
    }

    getData(state: GridState): Observable<PagedResult<CobrosGridModel>> {
        const command = this.filterSub$.value;
        return this.httpServie.getAll(command, state, this.ref);
    }

    anular(idCobro: number): Observable<void> {
        return this.httpServie.anular(idCobro);
    }
}