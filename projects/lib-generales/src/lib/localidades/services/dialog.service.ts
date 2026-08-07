import { Injectable } from '@angular/core';
import { DialogService } from 'lib-servicios';
import { Observable } from 'rxjs';
import { UpsertLocalidadDialogComponent } from '../dialog/upsert-dialog';

@Injectable({
  providedIn: 'root',
})
export class LocalidadesDialogService {
  constructor(private dialogService: DialogService) {}

  openLocalidadesUpsert$(idLocalidad?: number): Observable<void> {
    return this.dialogService
      .open(UpsertLocalidadDialogComponent, {
        data: { id: idLocalidad },
        size: 'xxl',
      })
      .afterClosed();
  }
}
