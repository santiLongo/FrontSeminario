import { Component, Inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  ButtonComponent,
  DateFormFieldComponent,
  ComboComponent,
  DecimalFormFieldComponent,
  NumberFormFieldComponent,
  CuitMaskComponent,
  AlertService,
} from 'lib-core';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { CobrosHttpService } from '../../services/http.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpdateCobroModel } from './model/update-cobro-model';

@Component({
  selector: 'app-update-cobro-dialog',
  templateUrl: './update-cobro.html',
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
    CuitMaskComponent,
  ],
})
export class UpdateCobroDialogComponent {
  formulario: FormGroup;
  idCobro: number;
  idCheque?: number;

  private destroy$ = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<UpdateCobroDialogComponent>,
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: CobrosHttpService,
    @Inject(MAT_DIALOG_DATA) data: { idCobro: number },
  ) {
    this.idCobro = data.idCobro;
  }

  ngOnInit(): void {
    this.formSetup();
    //
    this.moneda.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value > 1) {
          this.tipoCambio.reset();
        }
      });

    this.formaPago.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value !== 1) {
          this.cheque.reset();
        }
      });
    //
    this.httpService.get(this.idCobro).subscribe((res) => {
        this.idCheque = res.datosCheque?.idCheque
        this.formulario.patchValue(res);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formSetup() {
    this.formulario = this.fb.group({
      monto: [, Validators.compose([Validators.required])],
      idMoneda: [, { validators: Validators.required, updateOn: 'blur' }],
      tipoCambio: [],
      idFormaPago: [, Validators.required],
      datosCheque: this.fb.group({
        nroCheque: [],
        cuitEmisor: [],
        idBanco: [],
        fechaCobro: [],
      }),
    });
  }

  guardar() {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.alertService.error$('Algunos campos contienen errores').subscribe();
      return;
    }

    const command: UpdateCobroModel = this.formulario.getRawValue();
    command.idCobro = this.idCobro;

    this.httpService
      .update(command)
      .pipe(
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se actualizo el cobro correctamente',
          );
        }),
      )
      .subscribe(() => this.dialogRef.close());
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
