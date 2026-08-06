import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import {  MantenimientoGridModel } from "../models/mantenimentos-grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { MantenimientoHttpService } from "./http.service";
import { MantenimientoFilterModel } from "../models/mantenimentos-filter-model";
import { GridState, PagedResult } from "lib-servicios";

@Injectable()
export class MantenimientoDataService extends BaseGridService<MantenimientoGridModel> {
    
    public filterSub$: BehaviorSubject<MantenimientoFilterModel>;

    constructor(private httpService: MantenimientoHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<MantenimientoFilterModel>({});
    }
    
    getData(state: GridState): Observable<PagedResult<MantenimientoGridModel>> {
        const command = this.filterSub$.value;
        return this.httpService.getAll(command, state);
    }

    suspender(idMantenimiento: number): Observable<void> {
      return this.httpService.suspender(idMantenimiento);
    }
}