import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
    AlertService,
    ButtonComponent,
    ComboComponent,
    DateFormFieldComponent,
    DecimalFormFieldComponent,
    EditableGridService,
    FormFieldComponent,
    GridComponent,
    GridConfig,
} from 'lib-core';
import { CommonModule } from '@angular/common';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { Injectable } from '@angular/core';
import { PendientesConfirmarHttpService } from '../../services/http.service';
import { DetalleUpdateModel, UpdateRecibidaModel } from './models/model';

@Injectable()
class EditarRecibidaDetalleDataService extends EditableGridService<DetalleUpdateModel> {
    constructor(alertService: AlertService) {
        super(alertService);
    }
    get data() { return this.unwrap(this.items); }
}

@Component({
    selector: 'app-editar-recibida-dialog',
    templateUrl: './editar-recibida-dialog.html',
    imports: [
        MatDialogModule,
        ReactiveFormsModule,
        ButtonComponent,
        ComboComponent,
        DateFormFieldComponent,
        DecimalFormFieldComponent,
        FormFieldComponent,
        CommonModule,
        GridComponent,
        FormsModule,
    ],
    providers: [EditarRecibidaDetalleDataService],
})
export class EditarRecibidaDialogComponent implements OnInit, OnDestroy {
    @ViewChild('cantidadTpl', { static: true }) cantidadTpl: TemplateRef<any>;
    @ViewChild('precioTpl', { static: true }) precioTpl: TemplateRef<any>;
    @ViewChild('ivaTpl', { static: true }) ivaTpl: TemplateRef<any>;

    formulario: FormGroup;
    detallesConfig: GridConfig<DetalleUpdateModel>;
    cargando = true;
    private destroy$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<EditarRecibidaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { idFactura: number; numero: number },
        private fb: FormBuilder,
        private httpService: PendientesConfirmarHttpService,
        private alertService: AlertService,
        public detallesService: EditarRecibidaDetalleDataService,
    ) {}

    ngOnInit(): void {
        this.formulario = this.fb.group({
            idProveedor: [null],
            idTaller: [null],
            fechaEmision: [null, Validators.required],
            fechaVencimiento: [null],
            porcentajeIva: [21, Validators.required],
            idMoneda: [null, Validators.required],
            tipoCambio: [null],
            observaciones: [null],
        });

        this.detallesConfig = {
            columns: [
                { key: 'descripcion', title: 'Descripción', type: 'text', editable: true },
                { key: 'cantidad', title: 'Cantidad', type: 'numeric', format: '{0:2}', editable: true, editTemplate: this.cantidadTpl },
                { key: 'precioUnitario', title: 'Precio Unit.', type: 'numeric', format: '{0:2}', editable: true, editTemplate: this.precioTpl },
                { key: 'porcentajeIva', title: '% IVA', type: 'numeric', format: '{0:2}', editable: true, editTemplate: this.ivaTpl },
            ],
            isEditable: true,
        };

        this.moneda.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
            if (v <= 1) this.tipoCambio.reset();
        });

        this.httpService.getFactura(this.data.idFactura, 2).subscribe((factura) => {
            this.formulario.patchValue({
                idProveedor: factura.idProveedor,
                idTaller: factura.idTaller,
                fechaEmision: factura.fechaEmision ? new Date(factura.fechaEmision) : null,
                fechaVencimiento: factura.fechaVencimiento ? new Date(factura.fechaVencimiento) : null,
                porcentajeIva: factura.porcentajeIva,
                idMoneda: factura.idMoneda,
                tipoCambio: factura.tipoCambio,
                observaciones: factura.observaciones,
            });

            if (factura.detalles?.length) {
                const items = factura.detalles.map((d: any) => ({
                    descripcion: d.descripcion,
                    cantidad: d.cantidad,
                    precioUnitario: d.precioUnitario,
                    porcentajeIva: d.porcentajeIva ?? 0,
                }));
                this.detallesService.setAll(items);
            }

            this.cargando = false;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

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

        const command: UpdateRecibidaModel = {
            idProveedor: raw.idProveedor,
            idTaller: raw.idTaller,
            fechaEmision: raw.fechaEmision,
            fechaVencimiento: raw.fechaVencimiento,
            porcentajeIva: raw.porcentajeIva,
            idMoneda: raw.idMoneda,
            tipoCambio: raw.tipoCambio,
            observaciones: raw.observaciones,
            detalles: this.detallesService.data,
        };

        this.alertService
            .info$(`¿Guardar los cambios de la factura #${this.data.numero}?`)
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.updateRecibida(this.data.idFactura, command)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura actualizada correctamente')),
            )
            .subscribe(() => this.dialogRef.close(true));
    }

    salir() { this.dialogRef.close(); }

    get moneda() { return this.formulario.get('idMoneda')!; }
    get tipoCambio() { return this.formulario.get('tipoCambio')!; }
}
