import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { Observable } from 'rxjs';
import { ViajesLibService } from '../../config/viajes.service';
import { ChoferesFilterModel } from '../models/choferes-filter-model';
import { ChoferesGridModel } from '../models/choferes-grid-model';

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
}
