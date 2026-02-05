import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CoreLibService } from "lib-core";
import { Observable } from "rxjs";
import { ComboType } from "../models/combo-type";

@Injectable({
    providedIn: 'root'
})
export class ComboHttpService{
    private url = '';

    constructor(private http: HttpClient, private config: CoreLibService) {
        this.url = config.loginUrl + 'v1/combo/';
    }

    getCombo(type: string): Observable<ComboType[]>{
        const fullUrl = this.url + 'get' 
        return this.http.get<ComboType[]>(fullUrl, {params: { type }})
    }
}