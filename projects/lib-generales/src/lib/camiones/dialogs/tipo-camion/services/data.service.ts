import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import { TipoCamionGridModel } from "../model/grid-model";
import { Observable } from "rxjs";
import { TipoCamionHttpService } from "./http.service";
import { GridState, HttpRef, PagedResult } from "lib-servicios";

@Injectable()
export class TipoCamionDataService extends BaseGridService<TipoCamionGridModel> {
    
    constructor(private httpService: TipoCamionHttpService) {
        super();
    }
    
    override getData(state: GridState, ref: HttpRef): Observable<PagedResult<TipoCamionGridModel>> {
        return this.httpService.getAll(state, ref);
    }
    
    delete(id: number): Observable<void> {
        return this.httpService.delete(id);
    }
}