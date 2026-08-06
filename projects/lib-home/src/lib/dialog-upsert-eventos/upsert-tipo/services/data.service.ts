import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import { TipoEventoGridModel } from "../model/grid-model";
import { Observable } from "rxjs";
import { TipoEventoHttpService } from "./http.service";
import { GridState, PagedResult } from "lib-servicios";

@Injectable()
export class TipoEventoDataService extends BaseGridService<TipoEventoGridModel> {
    
    constructor(private httpService: TipoEventoHttpService) {
        super();
    }
    
    override getData(state: GridState): Observable<PagedResult<TipoEventoGridModel>> {
        return this.httpService.getAll(state);
    }
}