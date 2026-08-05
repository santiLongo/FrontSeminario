import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { ArchivoGridModel } from '../models/models';
import { Observable } from 'rxjs';
import { GeneralesLibService } from 'projects/lib-generales/src/lib/config/generales.service';

@Injectable({
  providedIn: 'root',
})
export class ArchivosCamionesHttpService {
  private url: string;

  constructor(
    private http: ApiHttpService,
    config: GeneralesLibService,
  ) {
    this.url = config.apiUrl + 'v1/archivosCamiones/';
  }

  getAll(
    idCamion: number,
    state: GridState,
  ): Observable<PagedResult<ArchivoGridModel>> {
    const fullUrl = this.url + 'getAll';
    return this.http.getState(fullUrl, { idCamion }, state);
  }
}
