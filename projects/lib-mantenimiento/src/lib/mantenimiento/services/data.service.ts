import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import {  MantenimientoGridModel } from "../models/mantenimentos-grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { MantenimientoHttpService } from "./http.service";
import { MantenimientoFilterModel } from "../models/mantenimentos-filter-model";
import { GridState, HttpRef, PagedResult } from "lib-servicios";

@Injectable()
export class MantenimientoDataService extends BaseGridService<MantenimientoGridModel> {
    override state: GridState = {
        sort: {
            field: 'fechaEntrada',
            direction: "desc"
        },
        page: 1,
        pageSize: 10,
    };


    public filterSub$: BehaviorSubject<MantenimientoFilterModel>;

    constructor(private httpService: MantenimientoHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<MantenimientoFilterModel>({});
    }
    
    getData(state: GridState, ref: HttpRef): Observable<PagedResult<MantenimientoGridModel>> {
        const command = this.filterSub$.value;
        return this.httpService.getAll(command, state, ref);
    }

    suspender(idMantenimiento: number): Observable<void> {
      return this.httpService.suspender(idMantenimiento);
    }

    borrar(idMantenimiento: number): Observable<void> {
      return this.httpService.borrar(idMantenimiento);
    }
}