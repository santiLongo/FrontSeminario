import { Injectable } from "@angular/core";
import { HomeLibService } from "../../config/home.service";
import { ApiHttpService } from "lib-core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HomeHttpService {
    private urlControl = '';

    constructor(private config: HomeLibService, private http: ApiHttpService){
        this.urlControl = config.loginUrl + 'v1/control-group/'
    }

    get(): Observable<any>{
        const fullUrl = this.urlControl + 'get';
        return this.http.get(fullUrl, null);
    }
}