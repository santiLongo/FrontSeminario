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
    NumberFormFieldComponent,
} from 'lib-core';
import { CommonModule } from '@angular/common';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { FacturasRecibidasHttpService } from '../../services/http.service';
import { CrearRecibidaModel, DetalleItemModel } from './models/model';
import { CrearRecibidaDetalleDataService } from './detalle-data.service';

@Component({
    standalone: true,
    selector: 'app-crear-recibida-dialog',
    templateUrl: './crear-dialog.html',
    imports: [
        MatDialogModule,
        ReactiveFormsModule,
        ButtonComponent,
        ComboComponent,
        DateFormFieldComponent,
        DecimalFormFieldComponent,
        FormFieldComponent,
        NumberFormFieldComponent,
        CommonModule,
        GridComponent,
        FormsModule
    ],
    providers: [CrearRecibidaDetalleDataService],
})
export class CrearRecibidaDialogComponent implements OnInit, OnDestroy {
    @ViewChild('cantidadTpl', { static: true }) cantidadTpl: TemplateRef<any>;
    @ViewChild('precioTpl', { static: true }) precioTpl: TemplateRef<any>;
    @ViewChild('ivaTpl', { static: true }) ivaTpl: TemplateRef<any>;

    formulario: FormGroup;
    detallesConfig: GridConfig<DetalleItemModel>;
    private destroy$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<CrearRecibidaDialogComponent>,
        private fb: FormBuilder,
        private alertService: AlertService,
        private httpService: FacturasRecibidasHttpService,
        public detallesService: CrearRecibidaDetalleDataService,
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
            idProveedor: [null],
            idTaller: [null],
            puntoVenta: [null, Validators.required],
            numero: [null, Validators.required],
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
        const raw = this.formulario.getRawValue();

        if (!raw.idProveedor && !raw.idTaller) {
            this.alertService.error$('Debe seleccionar un proveedor o un taller').subscribe();
            return;
        }
        if (this.formulario.invalid) {
            this.alertService.error$('Algunos campos contienen errores').subscribe();
            return;
        }
        if (this.detallesService.data.length === 0) {
            this.alertService.error$('Debe ingresar al menos un ítem').subscribe();
            return;
        }

        const command: CrearRecibidaModel = {
            idProveedor: raw.idProveedor,
            idTaller: raw.idTaller,
            puntoVenta: raw.puntoVenta,
            numero: raw.numero,
            fechaEmision: raw.fechaEmision,
            fechaVencimiento: raw.fechaVencimiento,
            porcentajeIva: raw.porcentajeIva,
            idMoneda: raw.idMoneda,
            tipoCambio: raw.tipoCambio,
            observaciones: raw.observaciones,
            detalles: this.detallesService.data,
        };

        this.alertService
            .info$('¿Confirmar la carga de la factura?')
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.add(command)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura registrada correctamente')),
            )
            .subscribe(() => this.salir());
    }

    get moneda() { return this.formulario.get('idMoneda')!; }
    get tipoCambio() { return this.formulario.get('tipoCambio')!; }
}
