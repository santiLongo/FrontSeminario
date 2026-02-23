import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { MantenimientoLibService } from '../../config/mantenimiento.service';
import { MantenimientoFilterModel } from '../models/mantenimentos-filter-model';
import { MantenimientoGridModel } from '../models/mantenimentos-grid-model';
import { UpsertMantenimientoModel } from '../dialog/models/upsert-model';

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

  get(idProveedor: number): Observable<UpsertMantenimientoModel> {
    const fullUrl = this.url + 'get';
    return this.http.getWithBlock(fullUrl, { idProveedor });
  }
}
