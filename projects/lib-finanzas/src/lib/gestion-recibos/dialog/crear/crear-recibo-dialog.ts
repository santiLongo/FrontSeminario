import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
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
} from 'lib-core';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { RecibosHttpService } from '../../services/http.service';
import { CrearReciboModel } from './models/crear-recibo-model';
import { ReciboPagoRowComponent } from './components/pago-row/pago-row';
import { ReciboImputacionRowComponent } from './components/imputacion-row/imputacion-row';

@Component({
    selector: 'app-crear-recibo-dialog',
    templateUrl: './crear-recibo-dialog.html',
    imports: [
        MatDialogModule,
        ReactiveFormsModule,
        ButtonComponent,
        ComboComponent,
        DateFormFieldComponent,
        DecimalFormFieldComponent,
        FormFieldComponent,
        MatButtonToggleModule,
        CommonModule,
        ReciboPagoRowComponent,
        ReciboImputacionRowComponent,
    ],
})
export class CrearReciboDialogComponent implements OnInit, OnDestroy {
    formulario: FormGroup;
    private destroy$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<CrearReciboDialogComponent>,
        private fb: FormBuilder,
        private alertService: AlertService,
        private httpService: RecibosHttpService,
    ) {}

    ngOnInit(): void {
        this.formSetup();
        this.moneda.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value <= 1) this.tipoCambio.reset();
        });
        this.agregarPago();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    formSetup() {
        this.formulario = this.fb.group({
            tipoRecibo: [1, Validators.required],
            fechaRecibo: [new Date(), Validators.required],
            idCliente: [],
            idProveedor: [],
            idTaller: [],
            idMoneda: [, Validators.required],
            tipoCambio: [],
            observaciones: [],
            formasDePago: this.fb.array([]),
            imputaciones: this.fb.array([]),
        });
    }

    agregarPago() {
        this.formasDePago.push(
            this.fb.group({
                idFormaPago: [, Validators.required],
                monto: [, Validators.required],
                datosCheque: this.fb.group({
                    nroCheque: [],
                    cuitEmisor: [],
                    idBanco: [],
                    fechaCobro: [],
                    esPropio: [false],
                }),
            })
        );
    }

    eliminarPago(index: number) {
        if (this.formasDePago.length > 1) {
            this.formasDePago.removeAt(index);
        }
    }

    agregarImputacion() {
        this.imputaciones.push(
            this.fb.group({
                idFactura: [, Validators.required],
                importeAplicado: [, Validators.required],
            })
        );
    }

    eliminarImputacion(index: number) {
        this.imputaciones.removeAt(index);
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

        const raw = this.formulario.getRawValue();
        const command: CrearReciboModel = {
            tipoRecibo: raw.tipoRecibo,
            fechaRecibo: raw.fechaRecibo,
            idCliente: raw.idCliente,
            idProveedor: raw.idProveedor,
            idTaller: raw.idTaller,
            idMoneda: raw.idMoneda,
            tipoCambio: raw.tipoCambio,
            observaciones: raw.observaciones,
            formasDePago: raw.formasDePago,
            imputaciones: raw.imputaciones.length ? raw.imputaciones : undefined,
        };

        this.alertService
            .info$('¿Seguro que desea crear el recibo?')
            .pipe(
                filter(Boolean),
                switchMap(() => this.httpService.add(command)),
                switchMap(() => this.alertService.success$('Éxito', 'Recibo creado correctamente')),
            )
            .subscribe(() => this.salir());
    }

    get tipoRecibo(): FormControl { return this.formulario.get('tipoRecibo') as FormControl; }
    get moneda(): FormControl { return this.formulario.get('idMoneda') as FormControl; }
    get tipoCambio(): FormControl { return this.formulario.get('tipoCambio') as FormControl; }
    get formasDePago(): FormArray { return this.formulario.get('formasDePago') as FormArray; }
    get imputaciones(): FormArray { return this.formulario.get('imputaciones') as FormArray; }
}
