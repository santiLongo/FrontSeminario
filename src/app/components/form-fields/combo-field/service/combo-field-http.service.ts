import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../config/api.config';
import { ComboModel } from '../combo-field.component';

@Injectable({
  providedIn: 'root'
})
export class ComboHttpService {

  private url = `${environment.apiUrl}/ComboController/`;

  constructor(private http: HttpClient) { }

  getInfo(req: string): Observable<Array<ComboModel>>{
    return this.http.get<Array<ComboModel>>(this.url + req);
    // return this.http.request<Array<ComboModel>>('get', this.url + req);
  }
}