import { Injectable } from '@angular/core';
import { DialogService } from 'lib-servicios';
import { Observable } from 'rxjs';
import { UpsertCamionDialogComponent } from '../dialogs/upsert-dialog/upsert-dialog';
import { ArchivosDialogComponent } from '../dialogs/archivos-dialog/archivos-dialog';
import { TipoCamionDialogComponent } from '../dialogs/tipo-camion/tipo-camion';

@Injectable({
  providedIn: 'root',
})
export class CamionDialogService {
  constructor(private dialogService: DialogService) {}

  openCamionUpsert$(idCamion?: number): Observable<void> {
    return this.dialogService
      .open(UpsertCamionDialogComponent, {
        data: { id: idCamion },
        size: 'xxl',
      })
      .afterClosed();
  }

  openArchivosCamion$(idCamion: number): Observable<void> {
    return this.dialogService
      .open(ArchivosDialogComponent, {
        data: { idCamion },
        size: 'xxl',
      })
      .afterClosed();
  }

  openTipoCamion$(): Observable<void> {
    return this.dialogService
      .open(TipoCamionDialogComponent, {
        size: 'xxl',
      })
      .afterClosed();
  }
}
