import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private urlVehiculos = `${environment.apiUrl}/vehiculo`;

  constructor(private http: HttpClient) { }

  getVehiculosPorUsuario(idUsuario: Number): Observable<any> {
    const url = this.urlVehiculos + '${}/GetVehiculoPorUsuario?idUsuario=' + idUsuario; 
    return this.http.get<any>(url);
  }
}