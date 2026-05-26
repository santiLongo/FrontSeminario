import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
    AlertService,
    ButtonComponent,
    ComboComponent,
    DateFormFieldComponent,
    FormFieldComponent,
    NumberFormFieldComponent,
} from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { PendientesMantenimientosHttpService } from '../../services/http.service';
import { GenerarFacturaMantenimientoModel } from './models/model';

@Component({
    selector: 'app-generar-factura-mantenimiento-dialog',
    templateUrl: './generar-dialog.html',
    imports: [
        MatDialogModule,
        ReactiveFormsModule,
        ButtonComponent,
        ComboComponent,
        DateFormFieldComponent,
        FormFieldComponent,
        NumberFormFieldComponent
    ],
})
export class GenerarFacturaMantenimientoDialogComponent implements OnInit {
    formulario: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<GenerarFacturaMantenimientoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { idMantenimiento: number; titulo: string },
        private fb: FormBuilder,
        private httpService: PendientesMantenimientosHttpService,
        private alertService: AlertService,
    ) {}

    ngOnInit(): void {
        this.formulario = this.fb.group({
            ptoVenta: [0, Validators.compose([Validators.required, Validators.min(1)])],
            numeroFactura: [0, Validators.compose([Validators.required, Validators.min(1)])],
            idMoneda: [1, Validators.required],
            porcentajeIva: [21, Validators.required],
            fechaVencimiento: [null],
            observaciones: [null],
        });
    }

    generar() {
        this.formulario.markAllAsTouched();
        if (this.formulario.invalid) {
            this.alertService.error$('Algunos campos contienen errores').subscribe();
            return;
        }

        const raw = this.formulario.getRawValue();
        const command: GenerarFacturaMantenimientoModel = {
            numeroFactura: raw.numeroFactura,
            ptoVenta: raw.ptoVenta,
            idMoneda: raw.idMoneda,
            porcentajeIva: raw.porcentajeIva,
            fechaVencimiento: raw.fechaVencimiento,
            observaciones: raw.observaciones,
        };

        this.alertService
            .info$(`¿Generar factura para el mantenimiento "${this.data.titulo}"?`)
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.generar(this.data.idMantenimiento, command)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura generada correctamente')),
            )
            .subscribe(() => this.dialogRef.close(true));
    }

    salir() { this.dialogRef.close(); }
}
