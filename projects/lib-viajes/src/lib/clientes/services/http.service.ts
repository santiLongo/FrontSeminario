import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { ViajesLibService } from '../../config/viajes.service';
import { ClienteGridModel } from '../models/grid-model';
import { ClienteFilterModel } from '../models/filter-model';
import { ClienteUpsertModel } from '../dialog/model/upsert-model';

@Injectable({
  providedIn: 'root',
})
export class ClientesHttpService {
  private url = '';

  constructor(
    private config: ViajesLibService,
    private http: ApiHttpService,
  ) {
    this.url = config.apiUrl + 'v1/cliente/';
  }

  getAll(
    command: ClienteFilterModel,
    state: GridState,
  ): Observable<PagedResult<ClienteGridModel>> {
    const fullUrl = this.url + 'getAll';
    return this.http.getState(fullUrl, command, state);
  }

  bajaAlta(idCliente: number): Observable<void> {
    const fullUrl = this.url + 'baja-alta';
    return this.http.postWithBlock(fullUrl, idCliente );
  }

  get(idCliente: number): Observable<ClienteUpsertModel> {
    const fullUrl = this.url + 'get';
    return this.http.getWithBlock(fullUrl, { idCliente });
  }

  upsert(command: ClienteUpsertModel): Observable<void> {
    const fullUrl = this.url + 'upsert';
    return this.http.postWithBlock(fullUrl, command);
  }
}
