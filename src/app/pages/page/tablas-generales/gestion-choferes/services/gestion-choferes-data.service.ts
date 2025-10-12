import { Injectable } from "@angular/core";
import { BaseReadService } from "../../../../../components/basic-grid/services/base-read.service";
import { GestionChoferesGridModel } from "../models/gestion-choferes-grid.model";
import { BehaviorSubject, Observable } from "rxjs";
import { GestionChoferesFilterModel } from "../models/gestion-chofer-filter.model";
import { GestionChoferesHttpService } from "./gestion-choferes-http.service";

@Injectable()
export class GestionChoferesDataService extends BaseReadService<GestionChoferesGridModel> {
    public filterSub$: BehaviorSubject<GestionChoferesFilterModel>;

    constructor(private httpService: GestionChoferesHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<GestionChoferesFilterModel>({});
    }
    
    getAll(): Observable<Array<GestionChoferesGridModel>> {
        let filter: GestionChoferesFilterModel = {}; 
        this.filterSub$.subscribe((req) => filter = req);
        return this.httpService.getAll(filter);
    }
}