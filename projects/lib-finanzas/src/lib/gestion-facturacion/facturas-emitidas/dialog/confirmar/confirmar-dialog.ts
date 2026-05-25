import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService, ButtonComponent, DateFormFieldComponent, FormFieldComponent } from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { FacturasEmitidasHttpService } from '../../services/http.service';
import { ConfirmarEmitidaModel } from './models/model';

@Component({
    selector: 'app-confirmar-emitida-dialog',
    templateUrl: './confirmar-dialog.html',
    imports: [MatDialogModule, ReactiveFormsModule, ButtonComponent, FormFieldComponent, DateFormFieldComponent],
})
export class ConfirmarEmitidaDialogComponent implements OnInit {
    formulario: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<ConfirmarEmitidaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { idFactura: number; numero: number },
        private fb: FormBuilder,
        private httpService: FacturasEmitidasHttpService,
        private alertService: AlertService,
    ) {}

    ngOnInit(): void {
        this.formulario = this.fb.group({
            cae: [null],
            caeFchVto: [null],
            tipoComprobante: [null],
        });
    }

    confirmar() {
        const raw = this.formulario.getRawValue();
        const command: ConfirmarEmitidaModel = {
            cae: raw.cae || undefined,
            caeFchVto: raw.caeFchVto || undefined,
            tipoComprobante: raw.tipoComprobante || undefined,
        };

        this.alertService
            .info$(`¿Confirmar la factura #${this.data.numero}?`)
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.confirmar(this.data.idFactura, command)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura confirmada correctamente')),
            )
            .subscribe(() => this.dialogRef.close(true));
    }

    salir() { this.dialogRef.close(); }
}
