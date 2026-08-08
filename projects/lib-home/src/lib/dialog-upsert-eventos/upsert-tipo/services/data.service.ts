import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import { TipoEventoGridModel } from "../model/grid-model";
import { Observable } from "rxjs";
import { TipoEventoHttpService } from "./http.service";
import { GridState, HttpRef, PagedResult } from "lib-servicios";

@Injectable()
export class TipoEventoDataService extends BaseGridService<TipoEventoGridModel> {
    
    constructor(private httpService: TipoEventoHttpService) {
        super();
    }
    
    override getData(state: GridState, ref: HttpRef): Observable<PagedResult<TipoEventoGridModel>> {
        return this.httpService.getAll(state, ref);
    }
}