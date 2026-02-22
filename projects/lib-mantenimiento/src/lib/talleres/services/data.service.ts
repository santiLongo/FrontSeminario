import { Injectable } from "@angular/core";
import { BaseGridService, GridState, PagedResult } from "lib-core";
import {  TalleresGridModel } from "../models/talleres-grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { TalleresHttpService } from "./http.service";
import { TalleresFilterModel } from "../models/talleres-filter-model";

@Injectable()
export class TalleresDataService extends BaseGridService<TalleresGridModel> {
    
    public filterSub$: BehaviorSubject<TalleresFilterModel>;

    constructor(private httpService: TalleresHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<TalleresFilterModel>({});
    }
    
    override getData(state: GridState): Observable<PagedResult<TalleresGridModel>> {
        const command = this.filterSub$.value;
        return this.httpService.getAll(command, state);
    }
}