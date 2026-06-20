import { Injectable } from "@angular/core";
import { ApiHttpService } from "lib-core";
import { Observable } from "rxjs";
import { AppConfigService } from "src/service/config.service";
import { MenuModel } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class HomeHttpService {
    private readonly url: string = '';

    constructor(config: AppConfigService, private http: ApiHttpService){
        this.url = config.url + 'v1/home/';
    }

    getMenu(): Observable<MenuModel[]> {
        const fullUrl = this.url + 'getMenu';
        return this.http.getWithBlock(fullUrl);
    }
}