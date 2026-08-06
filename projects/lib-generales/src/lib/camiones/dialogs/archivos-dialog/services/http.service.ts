import { Injectable } from '@angular/core';
import { ApiHttpService, GridState, PagedResult } from 'lib-core';
import { ArchivoGridModel } from '../models/models';
import { Observable } from 'rxjs';
import { GeneralesLibService } from 'projects/lib-generales/src/lib/config/generales.service';
import { ArchivosCamionesDataService } from './data.service';

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

  save(idCamion: number, archivo: File): Observable<void> {
    const fullUrl = this.url + 'save';
    const formData = new FormData();
    formData.append('idCamion', idCamion.toString());
    formData.append('file', archivo);

    return this.http.postWithBlock(
      fullUrl,
      formData,
      undefined,
      'Subiendo archivos...',
    );
  }

  download(id: number): Observable<Blob> {
    const fullUrl = this.url + 'download';
    return this.http.getBlob(fullUrl, { id }, 'Descargando archivo...');
  }

  delete(IdArchivoCamion: number): Observable<void> {
    const fullUrl = this.url + 'delete';
    return this.http.postWithBlock(fullUrl, { IdArchivoCamion });
  }
}
