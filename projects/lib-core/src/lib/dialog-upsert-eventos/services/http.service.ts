import { Injectable } from "@angular/core";
import { ApiHttpService, LibCoreConfig } from "lib-core";
import { Observable } from "rxjs";
import { EventoUpsertModel } from "../models/upsert-model";
import { CoreLibService } from "../../config/core.service";

@Injectable({
    providedIn: 'root'
})
export class EventosHttpService {
    private url = ''

    constructor(private config: CoreLibService, private http: ApiHttpService){
        this.url = config.loginUrl + 'v1/eventos/'
    }

    get(idEvento: number): Observable<EventoUpsertModel>{
        const fullUrl = this.url + 'get';
        return this.http.getWithBlock(fullUrl, {idEvento});
    }

    upsert(command: EventoUpsertModel): Observable<void>{
        const fullUrl = this.url + 'upsert';
        return this.http.postWithBlock(fullUrl, command);
    }
}