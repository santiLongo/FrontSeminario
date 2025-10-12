import { Injectable } from "@angular/core";
import { environment } from "../../../../../config/api.config";
import { HttpClient } from "@angular/common/http";
import { GestionChoferesFilterModel } from "../models/gestion-chofer-filter.model";
import { Observable } from "rxjs";
import { GestionChoferesGridModel } from "../models/gestion-choferes-grid.model";

@Injectable({
  providedIn: 'root'
})
export class GestionChoferesHttpService {
    private url = `${environment.apiUrl}/choferes/`;

    constructor(private http: HttpClient) { }

    getAll(req: GestionChoferesFilterModel): Observable<Array<GestionChoferesGridModel>>{
        const fullUrl = this.url + 'getAll';
        return this.http.post<Array<GestionChoferesGridModel>>(fullUrl, req);
    }
}