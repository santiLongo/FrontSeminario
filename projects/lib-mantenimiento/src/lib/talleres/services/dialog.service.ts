import { Injectable } from '@angular/core';
import { DialogService } from 'lib-servicios';
import { Observable } from 'rxjs';
import { UpsertTallerDialogComponent } from '../dialog/upsert-dialog';
import { TalleresGridModel } from '../models/talleres-grid-model';

@Injectable({
  providedIn: 'root',
})
export class TallerDialogService {
  constructor(private dialog: DialogService) {}

  openTallerUpsert$(idTaller?: number): Observable<number | undefined> {
    return this.dialog
      .open(UpsertTallerDialogComponent, {
        data: { idTaller: idTaller },
        size: 'xxl',
      })
      .afterClosed();
  }
}
