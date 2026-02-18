import { Injectable } from "@angular/core";
import { ApiHttpService, GridState, PagedResult } from "lib-core";
import { GeneralesLibService } from "lib-generales";
import { Observable } from "rxjs";
import { TipoCamionGridModel } from "../model/grid-model";
import { UpsertTipoCamionModel } from "../upsert/model/upsert-model";

@Injectable({
    providedIn: 'root'
})
export class TipoCamionHttpService {
    private url = '';
        
        constructor(private config: GeneralesLibService, private http: ApiHttpService) 
        {
            this.url = config.apiUrl + 'v1/tipo-camion/';
        }
    
        getAll(state: GridState): Observable<PagedResult<TipoCamionGridModel>> {
            const fullUrl = this.url + 'getAll';
            return this.http.getState(fullUrl, null, state);
        }
    
        upsert(command: UpsertTipoCamionModel): Observable<void> {
            const fullUrl = this.url + `upsert`;
            return this.http.post(fullUrl, command);
        }
    
        delete(id: number): Observable<void> {
            const fullUrl = this.url + `delete`;
            return this.http.postWithBlock(fullUrl, { id });
        }
}