import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { MantenimientoLibService } from '../../../config/mantenimiento.service';
import { Observable } from 'rxjs';
import { EspecialidadGridModel } from '../models/especialidad-grid';
import { UpsertEspecialidadModel } from '../upsert/model/upsert-model';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadHttpService {
  private url = '';

  constructor(
    private http: ApiHttpService,
    private config: MantenimientoLibService,
  ) {
    this.url = config.apiUrl + 'v1/especialidad/';
  }

  getAll(state: GridState): Observable<PagedResult<EspecialidadGridModel>> {
    const fullUrl = this.url + 'getAll';
    return this.http.getState(fullUrl, null, state);
  }

  upsert(command: UpsertEspecialidadModel): Observable<void> {
    const fullUrl = this.url + `upsert`;
    return this.http.postWithBlock(fullUrl, command);
  }
}
