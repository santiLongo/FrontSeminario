import { Injectable } from "@angular/core";
import { BaseGridService, GridState, PagedResult } from "lib-core";
import { TipoCamionGridModel } from "../model/grid-model";
import { Observable } from "rxjs";
import { TipoCamionHttpService } from "./http.service";

@Injectable()
export class TipoCamionDataService extends BaseGridService<TipoCamionGridModel> {
    
    constructor(private httpService: TipoCamionHttpService) {
        super();
    }
    
    override getData(state: GridState): Observable<PagedResult<TipoCamionGridModel>> {
        return this.httpService.getAll(state);
    }
    
    delete(id: number): Observable<void> {
        return this.httpService.delete(id);
    }
}