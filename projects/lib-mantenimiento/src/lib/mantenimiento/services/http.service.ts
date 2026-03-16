import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { MantenimientoLibService } from '../../config/mantenimiento.service';
import { MantenimientoFilterModel } from '../models/mantenimentos-filter-model';
import { MantenimientoGridModel } from '../models/mantenimentos-grid-model';
import { UpsertMantenimientoModel } from '../dialogs/dialog/models/upsert-model';
import { InfomarSalida } from '../dialogs/informar-salida/informar-salida';
import { InfomarImporte } from '../dialogs/informar-importe/informar-importe';
import { ObservacionesModel } from '../dialogs/observaciones/model/model';

@Injectable({
  providedIn: 'root',
})
export class MantenimientoHttpService {
  private url = '';

  constructor(
    private config: MantenimientoLibService,
    private http: ApiHttpService,
  ) {
    this.url = config.apiUrl + 'v1/mantenimiento/';
  }

  getAll(
    command: MantenimientoFilterModel,
    state: GridState,
  ): Observable<PagedResult<MantenimientoGridModel>> {
    const fullUrl = this.url + 'getAll';
    return this.http.getState(fullUrl, command, state);
  }

  upsert(command: UpsertMantenimientoModel): Observable<void> {
    const fullUrl = this.url + 'upsert';
    return this.http.postWithBlock(fullUrl, command);
  }

  get(idMantenimiento: number): Observable<UpsertMantenimientoModel> {
    const fullUrl = this.url + 'get';
    return this.http.getWithBlock(fullUrl, { idMantenimiento });
  }

  informarSalida(command: InfomarSalida): Observable<void> {
    const fullUrl = this.url + 'informar-salida';
    return this.http.postWithBlock(fullUrl, command);
  }

  informarImporte(command: InfomarImporte): Observable<void> {
    const fullUrl = this.url + 'informar-importe';
    return this.http.postWithBlock(fullUrl, command);
  }

  getObs(
    idMantenimiento: number,
    state: GridState,
  ): Observable<PagedResult<ObservacionesModel>> {
    const fullUrl = this.url + 'get-obs';
    return this.http.getState(fullUrl, { idMantenimiento }, state);
  }

  suspender(idMantenimiento: number): Observable<void> {
    const fullUrl = this.url + 'suspender';
    return this.http.postWithBlock(fullUrl, idMantenimiento );
  }
}
