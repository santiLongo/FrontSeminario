import { Injectable } from '@angular/core';
import { BaseGridService } from 'lib-components';
import { ArchivoGridModel } from '../models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArchivosCamionesHttpService } from './http.service';
import { GridState, HttpRef, PagedResult } from 'lib-servicios';

@Injectable()
export class ArchivosCamionesDataService extends BaseGridService<ArchivoGridModel> {
  private camion$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private httpService: ArchivosCamionesHttpService) {
    super();
  }

  getData(state: GridState, ref: HttpRef): Observable<PagedResult<ArchivoGridModel>> {
    const idCamion = this.camion;
    return this.httpService.getAll(idCamion, state, ref);
  }

  download(item: ArchivoGridModel): Observable<void> {
    return this.httpService.download(item);
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
