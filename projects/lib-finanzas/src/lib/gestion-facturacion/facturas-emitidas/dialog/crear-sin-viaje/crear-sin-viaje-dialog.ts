import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
    AlertService,
    ButtonComponent,
    ComboComponent,
    DateFormFieldComponent,
    DecimalFormFieldComponent,
    FormFieldComponent,
    GridComponent,
    GridConfig,
} from 'lib-core';
import { CommonModule } from '@angular/common';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { FacturasEmitidasHttpService } from '../../services/http.service';
import { CrearEmitidaSinViajeModel, DetalleItemModel } from './models/model';
import { CrearSinViajeDetalleDataService } from './detalle-data.service';

@Component({
    selector: 'app-crear-emitida-sin-viaje-dialog',
    templateUrl: './crear-sin-viaje-dialog.html',
    imports: [
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonComponent,
        ComboComponent,
        DateFormFieldComponent,
        DecimalFormFieldComponent,
        FormFieldComponent,
        CommonModule,
        GridComponent,
    ],
    providers: [CrearSinViajeDetalleDataService],
})
export class CrearEmitidaSinViajeDialogComponent implements OnInit, OnDestroy {
    @ViewChild('cantidadTpl', { static: true }) cantidadTpl: TemplateRef<any>;
    @ViewChild('precioTpl', { static: true }) precioTpl: TemplateRef<any>;
    @ViewChild('ivaTpl', { static: true }) ivaTpl: TemplateRef<any>;

    formulario: FormGroup;
    detallesConfig: GridConfig<DetalleItemModel>;
    private destroy$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<CrearEmitidaSinViajeDialogComponent>,
        private fb: FormBuilder,
        private alertService: AlertService,
        private httpService: FacturasEmitidasHttpService,
        public detallesService: CrearSinViajeDetalleDataService,
    ) {}

    ngOnInit(): void {
        this.formSetup();
        this.gridSetup();
        this.moneda.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
            if (v <= 1) this.tipoCambio.reset();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    formSetup() {
        this.formulario = this.fb.group({
            idCliente: [null, Validators.required],
            fechaEmision: [new Date(), Validators.required],
            fechaVencimiento: [null],
            porcentajeIva: [21, Validators.required],
            idMoneda: [null, Validators.required],
            tipoCambio: [null],
            observaciones: [null],
        });
    }

    gridSetup() {
        this.detallesConfig = {
            columns: [
                { key: 'descripcion', title: 'Descripción', type: 'text', editable: true },
                { key: 'cantidad', title: 'Cantidad', type: 'numeric', format: '{0:2}', editable: true, editTemplate: this.cantidadTpl },
                { key: 'precioUnitario', title: 'Precio Unit.', type: 'numeric', format: '{0:2}', editable: true, editTemplate: this.precioTpl },
                { key: 'porcentajeIva', title: '% IVA', type: 'numeric', format: '{0:2}', editable: true, editTemplate: this.ivaTpl },
            ],
            isEditable: true,
        };
    }

    salir() { this.dialogRef.close(); }

    guardar() {
        this.formulario.markAllAsTouched();
        if (this.formulario.invalid) {
            this.alertService.error$('Algunos campos contienen errores').subscribe();
            return;
        }
        if (this.detallesService.detalles.length === 0) {
            this.alertService.error$('Debe ingresar al menos un ítem').subscribe();
            return;
        }

        const raw = this.formulario.getRawValue();
        const command: CrearEmitidaSinViajeModel = {
            idCliente: raw.idCliente,
            fechaEmision: raw.fechaEmision,
            fechaVencimiento: raw.fechaVencimiento,
            porcentajeIva: raw.porcentajeIva,
            idMoneda: raw.idMoneda,
            tipoCambio: raw.tipoCambio,
            observaciones: raw.observaciones,
            detalles: this.detallesService.detalles,
        };

        this.alertService
            .info$('¿Confirmar la creación de la factura?')
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.addSinViaje(command)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura creada correctamente')),
            )
            .subscribe(() => this.salir());
    }

    get moneda() { return this.formulario.get('idMoneda')!; }
    get tipoCambio() { return this.formulario.get('tipoCambio')!; }
}
