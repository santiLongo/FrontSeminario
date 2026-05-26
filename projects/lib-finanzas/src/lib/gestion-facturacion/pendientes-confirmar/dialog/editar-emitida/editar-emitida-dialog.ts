import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
    AlertService,
    ButtonComponent,
    ComboComponent,
    DateFormFieldComponent,
    DecimalFormFieldComponent,
    FormFieldComponent,
} from 'lib-core';
import { CommonModule } from '@angular/common';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { PendientesConfirmarHttpService } from '../../services/http.service';
import { UpdateEmitidaModel } from './models/model';

@Component({
    selector: 'app-editar-emitida-dialog',
    templateUrl: './editar-emitida-dialog.html',
    imports: [
        MatDialogModule,
        ReactiveFormsModule,
        ButtonComponent,
        ComboComponent,
        DateFormFieldComponent,
        DecimalFormFieldComponent,
        FormFieldComponent,
        CommonModule,
    ],
})
export class EditarEmitidaDialogComponent implements OnInit, OnDestroy {
    formulario: FormGroup;
    cargando = true;
    private destroy$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<EditarEmitidaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { idFactura: number; numero: number },
        private fb: FormBuilder,
        private httpService: PendientesConfirmarHttpService,
        private alertService: AlertService,
    ) {}

    ngOnInit(): void {
        this.formulario = this.fb.group({
            fechaVencimiento: [null],
            idMoneda: [null],
            tipoCambio: [null],
            observaciones: [null],
        });

        this.moneda.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
            if (v <= 1) this.tipoCambio.reset();
        });

        this.httpService.getFactura(this.data.idFactura, 1).subscribe((factura) => {
            this.formulario.patchValue({
                fechaVencimiento: factura.fechaVencimiento ? new Date(factura.fechaVencimiento) : null,
                idMoneda: factura.idMoneda,
                tipoCambio: factura.tipoCambio,
                observaciones: factura.observaciones,
            });
            this.cargando = false;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    guardar() {
        const raw = this.formulario.getRawValue();
        const command: UpdateEmitidaModel = {
            fechaVencimiento: raw.fechaVencimiento,
            idMoneda: raw.idMoneda,
            tipoCambio: raw.tipoCambio,
            observaciones: raw.observaciones,
        };

        this.alertService
            .info$(`¿Guardar los cambios de la factura #${this.data.numero}?`)
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.updateEmitida(this.data.idFactura, command)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura actualizada correctamente')),
            )
            .subscribe(() => this.dialogRef.close(true));
    }

    salir() { this.dialogRef.close(); }

    get moneda() { return this.formulario.get('idMoneda')!; }
    get tipoCambio() { return this.formulario.get('tipoCambio')!; }
}
