import { Injectable } from "@angular/core";
import { ApiHttpService, GridState, HttpRef, PagedResult } from "lib-servicios";
import { Observable } from "rxjs";
import { TipoEventoGridModel } from "../model/grid-model";
import { UpsertTipoEventoModel } from "../upsert/model/upsert-model";
import { HomeLibService } from "../../../config/home.service";

@Injectable({
    providedIn: 'root'
})
export class TipoEventoHttpService {
    private url = '';
        
        constructor(private config: HomeLibService, private http: ApiHttpService) 
        {
            this.url = config.loginUrl + 'v1/eventos/';
        }
    
        getAll(state: GridState, ref: HttpRef): Observable<PagedResult<TipoEventoGridModel>> {
            const fullUrl = this.url + 'getTipos';
            return this.http.getState(fullUrl, null, state, ref);
        }
    
        add(command: UpsertTipoEventoModel): Observable<void> {
            const fullUrl = this.url + `addTipo`;
            return this.http.post(fullUrl, command);
        }
}