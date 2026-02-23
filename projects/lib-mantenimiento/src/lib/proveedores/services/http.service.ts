import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { MantenimientoLibService } from '../../config/mantenimiento.service';
import { ProveedoresFilterModel } from '../models/proveedores-filter-model';
import { ProveedoresGridModel } from '../models/proveedores-grid-model';
import { UpsertProveedorModel } from '../dialog/models/upsert-model';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresHttpService {
  private url = '';

  constructor(
    private config: MantenimientoLibService,
    private http: ApiHttpService,
  ) {
    this.url = config.apiUrl + 'v1/proveedor/';
  }

  getAll(
    command: ProveedoresFilterModel,
    state: GridState,
  ): Observable<PagedResult<ProveedoresGridModel>> {
    const fullUrl = this.url + 'getAll';
    return this.http.getState(fullUrl, command, state);
  }

  upsert(command: UpsertProveedorModel): Observable<void> {
    const fullUrl = this.url + 'upsert';
    return this.http.postWithBlock(fullUrl, command);
  }

  get(idProveedor: number): Observable<UpsertProveedorModel> {
    const fullUrl = this.url + 'get';
    return this.http.getWithBlock(fullUrl, { idProveedor });
  }
}
