import { Injectable } from '@angular/core';
import { DialogService } from 'lib-core';
import { Observable } from 'rxjs';
import { DetalleEmitidaDialogComponent } from '../components/detalle-facturas-emitidas/detalle-dialog';
import { DetalleRecibidaDialogComponent } from '../components/detalle-facturas-recibidas/detalle-dialog';

@Injectable({
  providedIn: 'root',
})
export class FinanzasDialogService {
  constructor(private dialog: DialogService) {}

  openDetalleEmitida(
    idFactura: number,
    showAnular: boolean = true,
  ): Observable<void> {
    return this.dialog
      .open(DetalleEmitidaDialogComponent, {
        data: { idFactura, showAnular },
        size: 'xxl',
      })
      .afterClosed();
  }

  openDetalleRecibida(
    idFactura: number,
    showAnular: boolean = true,
  ): Observable<void> {
    return this.dialog
      .open(DetalleRecibidaDialogComponent, {
        data: { idFactura, showAnular },
        size: 'xxl',
      })
      .afterClosed();
  }
}
