import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import { CamionesGridModel } from "../models/camiones-grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { CamionesFilterModel } from "../models/camiones-filter-model";
import { CamionesHttpService } from "./http.service";
import { GridState, PagedResult } from "lib-servicios";

@Injectable()
export class CamionesDataService extends BaseGridService<CamionesGridModel> {
    filterSub$: BehaviorSubject<CamionesFilterModel>

    constructor(private httpService: CamionesHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<CamionesFilterModel>({});
    }

    getData(state: GridState): Observable<PagedResult<CamionesGridModel>> {
        const command = this.filterSub$.value;
        return this.httpService.getAll(command, state);
    }

    darBaja(id: number): Observable<void> {
        return this.httpService.darBaja(id);
    }

    darAlta(id: number): Observable<void> {
        return this.httpService.darAlta(id);
    }
}