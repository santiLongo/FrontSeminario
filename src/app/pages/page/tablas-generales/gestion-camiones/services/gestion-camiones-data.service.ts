import { Injectable } from "@angular/core";
import { GestionCamionesHttpService } from "./gestion-camiones-http.service";
import { BehaviorSubject, Observable } from "rxjs";
import { GestionCamionesFilterModel } from "../models/gestion-camiones-filter.model";
import { GestionCamionesGridModel } from "../models/gestion-camiones-grid.model";
import { BaseReadService } from "../../../../../components/basic-grid/services/base-read.service";

@Injectable()
export class GestionCamionesDataService extends BaseReadService<GestionCamionesGridModel> {
    public filterSub$: BehaviorSubject<GestionCamionesFilterModel>;
    constructor(private httpService: GestionCamionesHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<GestionCamionesFilterModel>({});
    }

    getAll(): Observable<GestionCamionesGridModel[]> {
        let filter: GestionCamionesFilterModel = {};
        this.filterSub$.subscribe((req) => filter = req);
        return this.httpService.getAll(filter);
    }
}