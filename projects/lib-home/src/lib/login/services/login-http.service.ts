import { Injectable } from "@angular/core";
import { LoginCommand } from "../models/login-command";
import { Observable } from "rxjs";
import { LoginResponse } from "../models/login-response";
import { HomeLibService } from "lib-home";
import { ApiHttpService } from 'lib-core';

@Injectable({
    providedIn: 'root'
})
export class LoginHttpServie{
    private url = '' ;

    constructor(private httpService: ApiHttpService, private config: HomeLibService){
        this.url = this.config.loginUrl + 'v1/login/'
    }

    login(command: LoginCommand): Observable<LoginResponse>{
        const fullUrl = this.url + 'auth';
        return this.httpService.postWithBlock<LoginResponse>(fullUrl, command, null, 'Iniciando Sesion...');
    }
}