import { Injectable } from '@angular/core';
import { BaseGridService, GridState, PagedResult } from 'lib-core';
import { ArchivoGridModel } from '../models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArchivosCamionesHttpService } from './http.service';

@Injectable()
export class ArchivosCamionesDataService extends BaseGridService<ArchivoGridModel> {
  private camion$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private httpService: ArchivosCamionesHttpService) {
    super();
  }

  getData(state: GridState): Observable<PagedResult<ArchivoGridModel>> {
    const idCamion = this.camion;
    return this.httpService.getAll(idCamion, state);
  }

  download(id: number): Observable<Blob> {
    return this.httpService.download(id);
  }

  delete(id: number): Observable<void> {
    return this.httpService.delete(id);
  }

  get camion(): number {
    return this.camion$.value;
  }

  set camion(camion: number) {
    this.camion$.next(camion);
  }
}
