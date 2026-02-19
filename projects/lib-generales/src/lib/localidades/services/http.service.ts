import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { LocalidadGridModel } from '../models/localidad-grid-model';
import { LocalidadFilterModel } from '../models/localidad-filter-model';
import { UpsertLocalidadModel } from '../dialog/models/upsert-model';
import { GeneralesLibService } from '../../config/generales.service';

@Injectable({
  providedIn: 'root',
})
export class LocalidadHttpService {
  private url = '';

  constructor(
    private config: GeneralesLibService,
    private http: ApiHttpService,
  ) {
    this.url = config.apiUrl + 'v1/ubicacion/';
  }

  getAll(
    command: LocalidadFilterModel,
    state: GridState,
  ): Observable<PagedResult<LocalidadGridModel>> {
    const fullUrl = this.url + 'getAll';
    return this.http.getState(fullUrl, command, state);
  }

  upsert(command: UpsertLocalidadModel): Observable<void> {
    const fullUrl = this.url + 'upsert';
    return this.http.postWithBlock(fullUrl, command);
  }

  get(id: number): Observable<UpsertLocalidadModel> {
    const fullUrl = this.url + 'get';
    return this.http.getWithBlock(fullUrl, { id });
  }

  delete(id: number): Observable<void> {
    const fullUrl = this.url + 'delete';
    return this.http.postWithBlock(fullUrl, { id });
  }
}
