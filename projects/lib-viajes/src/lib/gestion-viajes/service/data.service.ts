import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import { GestionViajesGridModel } from "../models/grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { GestionViajesFilterModel } from "../models/filter-model";
import { GestionViajesHttpService } from "./http.service";
import { GridState, PagedResult } from "lib-servicios";

@Injectable()
export class GestionViajesDataService extends BaseGridService<GestionViajesGridModel> {
    public filterSub$: BehaviorSubject<GestionViajesFilterModel>;

    constructor(private httpService: GestionViajesHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<GestionViajesFilterModel>({});    
    }
    
    override getData(state: GridState): Observable<PagedResult<GestionViajesGridModel>> {
        const command = this.filterSub$.getValue();
        return this.httpService.getAll(command, state);
    }

}