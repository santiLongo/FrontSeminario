import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AlertService, ButtonComponent, ComboComponent, TextareaFormFieldComponent, DateFormFieldComponent, CuitMaskComponent, DecimalFormFieldComponent, NumberFormFieldComponent } from 'lib-core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GestionViajesHttpService } from '../../service/http.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { InformarCobroModel } from './models/informar-cobro-model';

@Component({
  selector: 'app-informar-descarga-dialog',
  templateUrl: './informar-cobro.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    DateFormFieldComponent,
    ComboComponent,
    DecimalFormFieldComponent,
    NumberFormFieldComponent,
    CuitMaskComponent
],
})
export class InformarCobroDialog implements OnInit, OnDestroy {
  formulario: FormGroup;
  idViaje: number;

  private destroy$ = new Subject<void>()

  constructor(
    private dialogRef: MatDialogRef<InformarCobroDialog>,
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: GestionViajesHttpService,
    @Inject(MAT_DIALOG_DATA) data: { idViaje: number },
  ) {
    this.idViaje = data.idViaje;
  }

    ngOnInit(): void {
        this.formSetup();
        //
        this.moneda.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
          if(value > 1){
            this.tipoCambio.reset()
          }
        })

        this.formaPago.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
          if(value !== 1){
            this.cheque.reset()
          }
        })
    }

    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formSetup() {
    const hoy = new Date();

    this.formulario = this.fb.group({
      fechaRecibido: [hoy, Validators.required],
      monto: [,Validators.compose([Validators.required])],
      idMoneda: [ ,{ validators: Validators.required, updateOn: 'blur'}],
      tipoCambio: [],
      idFormaPago: [,Validators.required],
      datosCheque: this.fb.group({
        nroCheque: [],
        cuitEmisor: [],
        idBanco: [],
        fechaEmision: [hoy],
        fechaDeposito: []
      })
    });
  }

  forzarEstado() {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.alertService.error$('Algunos campos contienen errores').subscribe();
      return;
    }

    const command: InformarCobroModel = this.formulario.getRawValue();
    command.idViaje = this.idViaje;

    this.httpService.altaCobro(command).pipe(
      switchMap(() => {
        return this.alertService.success$(
          'Exito',
          'Se guardo el cobro correctamente',
        );
      })
    ).subscribe(() => this.dialogRef.close());
  }

  salir() {
    this.dialogRef.close();
  }

  get moneda(): FormControl {
    return this.formulario.get('idMoneda') as FormControl;
  }

  get tipoCambio(): FormControl {
    return this.formulario.get('tipoCambio') as FormControl;
  }

  get formaPago(): FormControl {
    return this.formulario.get('idFormaPago') as FormControl;
  }

  get cheque(): FormGroup {
     return this.formulario.get('datosCheque') as FormGroup;
  }
}
