import { Injectable } from "@angular/core";
import { BaseGridService, GridState, PagedResult } from "lib-core";
import { LocalidadGridModel } from "../models/localidad-grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { LocalidadHttpService } from "./http.service";
import { LocalidadFilterModel } from "../models/localidad-filter-model";

@Injectable()
export class LocalidadDataService extends BaseGridService<LocalidadGridModel> {
    
    public filterSub$: BehaviorSubject<LocalidadFilterModel>;

    constructor(private httpService: LocalidadHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<LocalidadFilterModel>({});
    }
    
    override getData(state: GridState): Observable<PagedResult<LocalidadGridModel>> {
        const command = this.filterSub$.value;
        return this.httpService.getAll(command, state);
    }

    delete(id: number): Observable<void> {
        return this.httpService.delete(id);
    }
}