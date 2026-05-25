import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService, ButtonComponent, ComboComponent, DateFormFieldComponent, FormFieldComponent } from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { PendientesViajesHttpService } from '../../services/http.service';
import { GenerarFacturaViajeModel } from './models/model';

@Component({
    selector: 'app-generar-factura-viaje-dialog',
    templateUrl: './generar-dialog.html',
    imports: [MatDialogModule, ReactiveFormsModule, ButtonComponent, ComboComponent, DateFormFieldComponent, FormFieldComponent],
})
export class GenerarFacturaViajeDialogComponent implements OnInit {
    formulario: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<GenerarFacturaViajeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { idViaje: number; nroViaje?: number },
        private fb: FormBuilder,
        private httpService: PendientesViajesHttpService,
        private alertService: AlertService,
    ) {}

    ngOnInit(): void {
        this.formulario = this.fb.group({
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
        const command: GenerarFacturaViajeModel = {
            idMoneda: raw.idMoneda,
            porcentajeIva: raw.porcentajeIva,
            fechaVencimiento: raw.fechaVencimiento,
            observaciones: raw.observaciones,
        };

        this.alertService
            .info$(`¿Generar factura para el viaje #${this.data.nroViaje ?? this.data.idViaje}?`)
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.generar(this.data.idViaje, command)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura generada correctamente')),
            )
            .subscribe(() => this.dialogRef.close(true));
    }

    salir() { this.dialogRef.close(); }
}
