import { Injectable } from '@angular/core';
import { BaseUploadService } from 'lib-components';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { map, Observable } from 'rxjs';
import { ArchivosCamionesHttpService } from './http.service';

/**
 * Adaptador que conecta el UploadFilesComponent con la API de archivos de camiones.
 * Le decis a que camion pertenecen los archivos con `setCamion`.
 */
@Injectable()
export class ArchivosUploadService extends BaseUploadService {
  private idCamion = 0;

  constructor(private http: ArchivosCamionesHttpService) {
    super();
  }

  setCamion(idCamion: number): void {
    this.idCamion = idCamion;
  }

  upload(file: File): Observable<void> {
    return this.http.save(this.idCamion, file);
  }
}
