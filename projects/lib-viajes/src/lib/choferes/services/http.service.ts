import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { ViajesLibService } from '../../config/viajes.service';
import { ChoferesFilterModel } from '../models/choferes-filter-model';
import { ChoferesGridModel } from '../models/choferes-grid-model';
import { UpsertChoferModel } from '../dialogs/upsert/models/upsert-model';

@Injectable({
  providedIn: 'root',
})
export class ChoferesHttpService {
  private url = '';

  constructor(
    private config: ViajesLibService,
    private http: ApiHttpService,
  ) {
    this.url = config.apiUrl + 'v1/choferes/';
  }

  getAll(
    command: ChoferesFilterModel,
    state: GridState,
  ): Observable<PagedResult<ChoferesGridModel>> {
    const fullUrl = this.url + 'getAll';
    return this.http.getState(fullUrl, command, state);
  }

  upsert(command: UpsertChoferModel): Observable<void> {
    const fullUrl = this.url + 'upsert';
    return this.http.postWithBlock(fullUrl, command);
  }

  get(idChofer: number): Observable<UpsertChoferModel> {
    const fullUrl = this.url + 'get';
    return this.http.getWithBlock(fullUrl, {idChofer});
  }

  baja(idChofer: number): Observable<void> {
    const fullUrl = this.url + 'baja';
    return this.http.postWithBlock(fullUrl, {idChofer});
  }

  alta(idChofer: number): Observable<void> {
    const fullUrl = this.url + 'alta';
    return this.http.postWithBlock(fullUrl, {idChofer});
  }
}
