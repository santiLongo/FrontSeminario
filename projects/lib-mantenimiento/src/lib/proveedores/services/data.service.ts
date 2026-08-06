import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import {  ProveedoresGridModel } from "../models/proveedores-grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { ProveedoresHttpService } from "./http.service";
import { ProveedoresFilterModel } from "../models/proveedores-filter-model";
import { GridState, PagedResult } from "lib-servicios";

@Injectable()
export class ProveedoresDataService extends BaseGridService<ProveedoresGridModel> {
    
    public filterSub$: BehaviorSubject<ProveedoresFilterModel>;

    constructor(private httpService: ProveedoresHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<ProveedoresFilterModel>({});
    }
    
    override getData(state: GridState): Observable<PagedResult<ProveedoresGridModel>> {
        const command = this.filterSub$.value;
        return this.httpService.getAll(command, state);
    }
}