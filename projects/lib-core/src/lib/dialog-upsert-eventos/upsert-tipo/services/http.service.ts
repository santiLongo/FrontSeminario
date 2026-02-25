import { Injectable } from "@angular/core";
import { ApiHttpService, GridState, PagedResult } from "lib-core";
import { Observable } from "rxjs";
import { CoreLibService } from "../../../config/core.service";
import { TipoEventoGridModel } from "../model/grid-model";
import { UpsertTipoEventoModel } from "../upsert/model/upsert-model";

@Injectable({
    providedIn: 'root'
})
export class TipoEventoHttpService {
    private url = '';
        
        constructor(private config: CoreLibService, private http: ApiHttpService) 
        {
            this.url = config.loginUrl + 'v1/eventos/';
        }
    
        getAll(state: GridState): Observable<PagedResult<TipoEventoGridModel>> {
            const fullUrl = this.url + 'getTipos';
            return this.http.getState(fullUrl, null, state);
        }
    
        add(command: UpsertTipoEventoModel): Observable<void> {
            const fullUrl = this.url + `addTipo`;
            return this.http.post(fullUrl, command);
        }
}