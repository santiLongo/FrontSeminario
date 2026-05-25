import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService, ButtonComponent } from 'lib-core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { filter, switchMap } from 'rxjs';
import { FacturasEmitidasHttpService } from '../../services/http.service';
import { GetFacturaEmitidaResponse } from './models/model';

const ESTADO_LABELS: Record<number, string> = { 1: 'Pendiente', 2: 'Pago Parcial', 3: 'Cancelada', 4: 'Anulada' };

@Component({
    selector: 'app-detalle-emitida-dialog',
    templateUrl: './detalle-dialog.html',
    imports: [MatDialogModule, ButtonComponent, CommonModule, DatePipe, DecimalPipe],
})
export class DetalleEmitidaDialogComponent implements OnInit {
    factura?: GetFacturaEmitidaResponse;

    constructor(
        private dialogRef: MatDialogRef<DetalleEmitidaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { idFactura: number },
        private httpService: FacturasEmitidasHttpService,
        private alertService: AlertService,
    ) {}

    ngOnInit(): void {
        this.httpService.get(this.data.idFactura).subscribe((res) => (this.factura = res));
    }

    anular() {
        this.alertService
            .info$('¿Seguro que desea anular esta factura?')
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.anular(this.data.idFactura)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura anulada correctamente')),
            )
            .subscribe(() => this.dialogRef.close(true));
    }

    salir() { this.dialogRef.close(); }

    get estadoLabel(): string { return ESTADO_LABELS[this.factura?.estado ?? 0] ?? ''; }
}
