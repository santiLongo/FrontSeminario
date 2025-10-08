import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private iniciarSesionUrl = `${environment.apiUrl}/inicio/iniciarSesion`;

  constructor(private http: HttpClient) { }

  login(credentials: { mail: string, password: string }): Observable<any> {
    return this.http.post<any>(this.iniciarSesionUrl, credentials);
  }
}
