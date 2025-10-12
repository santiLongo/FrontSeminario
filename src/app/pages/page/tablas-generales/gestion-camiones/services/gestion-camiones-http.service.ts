import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GestionCamionesFilterModel } from "../models/gestion-camiones-filter.model";
import { Observable } from "rxjs";
import { GestionCamionesGridModel } from "../models/gestion-camiones-grid.model";
import { environment } from "../../../../../config/api.config";

@Injectable({
  providedIn: "root",
})
export class GestionCamionesHttpService {
    private url = `${environment.apiUrl}/camiones/`;
    constructor(private http: HttpClient) {}

  getAll(req: GestionCamionesFilterModel): Observable<Array<GestionCamionesGridModel>> {
    const fullUrl = this.url + "getAll";
    return this.http.post<Array<GestionCamionesGridModel>>(fullUrl, req);
}
}