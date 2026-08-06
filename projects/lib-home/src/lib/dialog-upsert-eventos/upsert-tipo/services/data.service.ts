import { Injectable } from "@angular/core";
import { BaseGridService, GridState, PagedResult } from "lib-core";
import { TipoEventoGridModel } from "../model/grid-model";
import { Observable } from "rxjs";
import { TipoEventoHttpService } from "./http.service";

@Injectable()
export class TipoEventoDataService extends BaseGridService<TipoEventoGridModel> {
    
    constructor(private httpService: TipoEventoHttpService) {
        super();
    }
    
    override getData(state: GridState): Observable<PagedResult<TipoEventoGridModel>> {
        return this.httpService.getAll(state);
    }
}