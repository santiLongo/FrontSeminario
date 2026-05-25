import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService, ButtonComponent } from 'lib-core';
import { CommonModule } from '@angular/common';
import { filter, switchMap } from 'rxjs';
import { RecibosHttpService } from '../../services/http.service';
import { GetReciboResponse } from './models/detalle-recibo-model';

@Component({
    selector: 'app-detalle-recibo-dialog',
    templateUrl: './detalle-recibo-dialog.html',
    imports: [
        MatDialogModule,
        ButtonComponent,
        CommonModule,
    ],
})
export class DetalleReciboDialogComponent implements OnInit {
    idRecibo: number;
    recibo?: GetReciboResponse;

    constructor(
        private dialogRef: MatDialogRef<DetalleReciboDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: { idRecibo: number },
        private httpService: RecibosHttpService,
        private alertService: AlertService,
    ) {
        this.idRecibo = data.idRecibo;
    }

    ngOnInit(): void {
        this.httpService.get(this.idRecibo).subscribe((res) => {
            this.recibo = res;
        });
    }

    anular() {
        this.alertService
            .info$('¿Seguro que desea anular este recibo?')
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.anular(this.idRecibo)),
                switchMap(() => this.alertService.success$('Éxito', 'Recibo anulado correctamente')),
            )
            .subscribe(() => this.dialogRef.close(true));
    }

    salir() {
        this.dialogRef.close();
    }

    get tipoLabel(): string {
        return this.recibo?.tipo === 1 ? 'Cobro' : 'Pago';
    }
}
