import { Injectable } from "@angular/core";
import { BaseGridService  } from "lib-components";
import { EspecialidadGridModel } from "../models/especialidad-grid";
import { Observable } from "rxjs";
import { EspecialidadHttpService } from "./http.service";
import { GridState, HttpRef, PagedResult } from "lib-servicios";

@Injectable()
export class EspecialidadDataService extends BaseGridService<EspecialidadGridModel> {
    
    public selectedRows: EspecialidadGridModel[] = []

    constructor(private httpService: EspecialidadHttpService){
        super()
    }

    override getData(state: GridState, ref: HttpRef): Observable<PagedResult<EspecialidadGridModel>> {
        return this.httpService.getAll(state, ref);
    }
    
}