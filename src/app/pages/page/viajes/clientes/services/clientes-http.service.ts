import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ClientesGridModel } from "../models/clientes-grid.model";
import { environment } from "../../../../../config/api.config";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class ClientesHttpService {
    private url = `${environment.apiUrl}/cliente/`;

    constructor(private http: HttpClient) { }
    
    getAll(filter: any): Observable<ClientesGridModel[]> {
        const fullUrl = this.url + 'getAll';
        return this.http.get<ClientesGridModel[]>(fullUrl, {params: filter});
    }
}