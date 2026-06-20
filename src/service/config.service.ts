import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, AppConfig } from "src/config/app.config";

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private readonly _url;

    constructor(@Inject(APP_CONFIG) app: AppConfig){
        this._url = app.urlLogin
    }

    get url (){
        return this._url;
    }
}