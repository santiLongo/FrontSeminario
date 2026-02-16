import { Injectable } from '@angular/core';
import { ApiHttpService } from 'lib-core';
import { ViajesLibService } from 'lib-viajes';
import { FormularioDataViaje } from '../models/formulario-data';
import { Observable } from 'rxjs';
import { BuscoChoferResponse } from '../models/busco-chofer-response';
import { FormularioAddCommand } from '../models/formulario-add-command';

@Injectable({
  providedIn: 'root',
})
export class FormularioViajeHttpService {
  private url: string;
  private urlForm: string;

  constructor(
    private config: ViajesLibService,
    private http: ApiHttpService,
  ) {
    this.url = config.apiUrl + 'v1/viaje/';
    this.urlForm = config.apiUrl + 'v1/formulario-viaje/';
  }

  get(idViaje: number): Observable<FormularioDataViaje> {
    const fullUrl = this.url + 'get';
    return this.http.get(fullUrl, { idViaje });
  }

  add(command: FormularioAddCommand): Observable<any> {
    const fullUrl = this.url + 'add';
    return this.http.postWithBlock(fullUrl, command);
  }

  getCuitCliente(idCliente: number): Observable<{ cuit: string }> {
    const fullUrl = this.urlForm + 'cuit-cliente';
    return this.http.get(fullUrl, { idCliente });
  }

  getBuscoChofer(idChofer: number): Observable<BuscoChoferResponse> {
    const fullUrl = this.urlForm + 'busco-chofer';
    return this.http.get(fullUrl, { idChofer });
  }

  getUltimoMantenimiento(
    idCamion: number,
  ): Observable<{ ultimoMantenimiento: Date }> {
    const fullUrl = this.urlForm + 'ultimo-mantenimiento';
    return this.http.get(fullUrl, { idCamion });
  }
}
