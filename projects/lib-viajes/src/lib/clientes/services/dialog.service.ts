import { Injectable } from '@angular/core';
import { DialogService } from 'lib-servicios';
import { Observable } from 'rxjs';
import { UpsertClienteDialogComponent } from '../dialog/upsert-dialog';

@Injectable({
  providedIn: 'root',
})
export class ClienteDialogService {
  constructor(private dialogService: DialogService) {}

  openClienteUpsert$(idCliente?: number): Observable<void> {
    return this.dialogService
      .open(UpsertClienteDialogComponent, {
        data: { idCliente },
        size: 'xxl',
      })
      .afterClosed();
  }
}
