import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginCommand } from "../models/login-command";
import { Observable } from "rxjs";
import { LoginResponse } from "../models/login-response";
import { HomeLibService, LibHomeConfig } from "lib-home";

@Injectable({
    providedIn: 'root'
})
export class LoginHttpServie{
    private url = '' ;

    constructor(private httpService: HttpClient, private config: HomeLibService){
        this.url = this.config.loginUrl + 'v1/login/'
    }

    login(command: LoginCommand): Observable<LoginResponse>{
        const fullUrl = this.url + 'auth';
        return this.httpService.post<LoginResponse>(fullUrl, command);
    }
}