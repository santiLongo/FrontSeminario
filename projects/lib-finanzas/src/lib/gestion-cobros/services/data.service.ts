import { Injectable } from "@angular/core";
import { BaseGridService, GridState, PagedResult } from 'lib-core'
import { CobrosGridModel } from "../models/cobros-grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { CobrosFilterModel } from "../models/cobros-filter-model";
import { CobrosHttpService } from "./http.service";

@Injectable()
export class CobrosDataService extends BaseGridService<CobrosGridModel> {
    filterSub$ = new BehaviorSubject<CobrosFilterModel>({})

    constructor(private httpServie: CobrosHttpService){
        super()
    }

    getData(state: GridState): Observable<PagedResult<CobrosGridModel>> {
        const command = this.filterSub$.value;
        return this.httpServie.getAll(command, state);
    }

    anular(idCobro: number): Observable<void> {
        return this.httpServie.anular(idCobro);
    }
}