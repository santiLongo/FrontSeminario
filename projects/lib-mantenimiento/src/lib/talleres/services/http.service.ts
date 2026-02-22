import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { MantenimientoLibService } from '../../config/mantenimiento.service';
import { TalleresFilterModel } from '../models/talleres-filter-model';
import { TalleresGridModel } from '../models/talleres-grid-model';
import { UpsertTallerModel } from '../dialog/models/upsert-model';

@Injectable({
  providedIn: 'root',
})
export class TalleresHttpService {
  private url = '';

  constructor(
    private config: MantenimientoLibService,
    private http: ApiHttpService,
  ) {
    this.url = config.apiUrl + 'v1/ubicacion/';
  }

  getAll(
    command: TalleresFilterModel,
    state: GridState,
  ): Observable<PagedResult<TalleresGridModel>> {
    const fullUrl = this.url + 'getAll';
    return this.http.getState(fullUrl, command, state);
  }

  upsert(command: UpsertTallerModel): Observable<void> {
    const fullUrl = this.url + 'upsert';
    return this.http.postWithBlock(fullUrl, command);
  }

  get(idTaller: number): Observable<UpsertTallerModel> {
    const fullUrl = this.url + 'get';
    return this.http.getWithBlock(fullUrl, { idTaller });
  }
}
