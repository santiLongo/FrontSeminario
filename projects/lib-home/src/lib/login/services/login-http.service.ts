import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginCommand } from "../models/login-command";
import { Observable } from "rxjs";
import { LoginResponse } from "../models/login-response";

@Injectable({
    providedIn: 'root'
})
export class LoginHttpServie{
    private url = 'https://localhost:44301/api/' + 'v1/login/';

    constructor(private httpService: HttpClient){

    }

    login(command: LoginCommand): Observable<LoginResponse>{
        const fullUrl = this.url + 'auth';
        return this.httpService.post<LoginResponse>(fullUrl, command);
    }
}