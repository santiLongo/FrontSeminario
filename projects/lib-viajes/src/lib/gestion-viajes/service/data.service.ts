import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-core";
import { GestionViajesGridModel } from "../models/grid-model";
import { BehaviorSubject, Observable } from "rxjs";
import { GestionViajesFilterModel } from "../models/filter-model";
import { GestionViajesHttpService } from "./http.service";

@Injectable()
export class GestionViajesDataService extends BaseGridService<GestionViajesGridModel> {
    
    public filterSub$: BehaviorSubject<GestionViajesFilterModel>;

    constructor(private httpService: GestionViajesHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<GestionViajesFilterModel>({});    
    }
    
    override getData(loading: boolean): Observable<GestionViajesGridModel[]> {
        const command = this.filterSub$.getValue();
        return this.httpService.getAll(command);
    }

}