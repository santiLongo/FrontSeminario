import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
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
import { CrearEmitidaConViajeModel, ViajesPendienteItem } from './models/model';
import { CrearConViajeDetalleDataService } from './detalle-data.service';
import { DetalleItemModel } from './models/model';

@Component({
    selector: 'app-crear-emitida-con-viaje-dialog',
    templateUrl: './crear-con-viaje-dialog.html',
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
    providers: [CrearConViajeDetalleDataService],
})
export class CrearEmitidaConViajeDialogComponent implements OnInit, OnDestroy {
    @ViewChild('cantidadTpl', { static: true }) cantidadTpl: TemplateRef<any>;
    @ViewChild('precioTpl', { static: true }) precioTpl: TemplateRef<any>;
    @ViewChild('ivaTpl', { static: true }) ivaTpl: TemplateRef<any>;

    formulario: FormGroup;
    detallesConfig: GridConfig<DetalleItemModel>;
    viajesPendientes: ViajesPendienteItem[] = [];
    viajesAgregados: { idViaje: number; nroViaje?: string; montoViaje: number }[] = [];
    private destroy$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<CrearEmitidaConViajeDialogComponent>,
        private fb: FormBuilder,
        private alertService: AlertService,
        private httpService: FacturasEmitidasHttpService,
        public detallesService: CrearConViajeDetalleDataService,
    ) {}

    ngOnInit(): void {
        this.formSetup();
        this.gridSetup();
        this.cargarViajesPendientes();
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
            // Fila de selección de viaje temporal (no enviada al backend)
            _idViajeSeleccionado: [null],
            _montoViajeSeleccionado: [null],
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

    cargarViajesPendientes() {
        this.httpService.getViajesPendientes().subscribe((viajes) => {
            this.viajesPendientes = viajes;
        });
    }

    agregarViaje() {
        const idViaje = this.formulario.get('_idViajeSeleccionado')?.value;
        const monto = this.formulario.get('_montoViajeSeleccionado')?.value;

        if (!idViaje || !monto) {
            this.alertService.error$('Seleccioná un viaje e ingresá el monto').subscribe();
            return;
        }

        if (this.viajesAgregados.some((v) => v.idViaje === idViaje)) {
            this.alertService.error$('El viaje ya fue agregado').subscribe();
            return;
        }

        const viajePendiente = this.viajesPendientes.find((v) => v.idViaje === idViaje);
        this.viajesAgregados = [...this.viajesAgregados, { idViaje, nroViaje: viajePendiente?.nroViaje, montoViaje: monto }];
        this.formulario.patchValue({ _idViajeSeleccionado: null, _montoViajeSeleccionado: null });
    }

    quitarViaje(idViaje: number) {
        this.viajesAgregados = this.viajesAgregados.filter((v) => v.idViaje !== idViaje);
    }

    salir() {
        this.dialogRef.close();
    }

    guardar() {
        this.formulario.markAllAsTouched();
        if (this.formulario.invalid) {
            this.alertService.error$('Algunos campos contienen errores').subscribe();
            return;
        }
        if (this.viajesAgregados.length === 0) {
            this.alertService.error$('Debe asociar al menos un viaje').subscribe();
            return;
        }
        if (this.detallesService.detalles.length === 0) {
            this.alertService.error$('Debe ingresar al menos un ítem').subscribe();
            return;
        }

        const raw = this.formulario.getRawValue();
        const command: CrearEmitidaConViajeModel = {
            idCliente: raw.idCliente,
            viajes: this.viajesAgregados.map((v) => ({ idViaje: v.idViaje, montoViaje: v.montoViaje })),
            fechaEmision: raw.fechaEmision,
            fechaVencimiento: raw.fechaVencimiento,
            porcentajeIva: raw.porcentajeIva,
            idMoneda: raw.idMoneda,
            tipoCambio: raw.tipoCambio,
            observaciones: raw.observaciones,
            detalles: this.detallesService.detalles,
        };

        this.alertService
            .info$('¿Confirmar la creación de la factura emitida?')
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.addConViaje(command)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura creada correctamente')),
            )
            .subscribe(() => this.salir());
    }

    get viajesCombo() {
        return this.viajesPendientes.map((v) => ({
            numero: v.idViaje,
            descripcion: `${v.nroViaje ?? v.idViaje} - ${v.razonSocialCliente ?? ''} ($${v.montoTotal})`,
        }));
    }

    get moneda() { return this.formulario.get('idMoneda')!; }
    get tipoCambio() { return this.formulario.get('tipoCambio')!; }
}
