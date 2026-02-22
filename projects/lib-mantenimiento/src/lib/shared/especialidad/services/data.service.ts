import { Injectable } from "@angular/core";
import { BaseGridService, GridState, PagedResult } from "lib-core";
import { EspecialidadGridModel } from "../models/especialidad-grid";
import { Observable } from "rxjs";
import { EspecialidadHttpService } from "./http.service";

@Injectable()
export class EspecialidadDataService extends BaseGridService<EspecialidadGridModel> {
    
    public selectedRows: EspecialidadGridModel[] = []

    constructor(private httpService: EspecialidadHttpService){
        super()
    }

    override getData(state: GridState): Observable<PagedResult<EspecialidadGridModel>> {
        return this.httpService.getAll(state);
    }
    
}