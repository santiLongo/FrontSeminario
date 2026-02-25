import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  ComboComponent,
  ButtonComponent,
  FormFieldComponent,
  AlertService,
  CuitMaskComponent,
  NumberFormFieldComponent,
  GridComponent,
  GridConfig,
  DialogService,
  DateFormFieldComponent,
  DecimalFormFieldComponent,
  TextareaFormFieldComponent,
} from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { MantenimientoHttpService } from '../services/http.service';

@Component({
  selector: 'app-infomar-salida-dialog',
  templateUrl: './informar-salida.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    ReactiveFormsModule,
    DateFormFieldComponent,
    FormsModule,
    TextareaFormFieldComponent,
  ],
})
export class InformarSalidaDialogComponent implements OnInit {
  public idMantenimiento: number;
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<InformarSalidaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { idMantenimiento: number },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: MantenimientoHttpService,
  ) {
    this.idMantenimiento = data?.idMantenimiento;
  }

  ngOnInit(): void {
    this.formSetup();
  }

  formSetup() {
    this.formulario = this.fb.group({
      fechaSalida: [, Validators.compose([Validators.required])],
      observacion: [],
    });
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

    const command = this.formulario.getRawValue() as InfomarSalida;
    command.idMantenimiento = this.idMantenimiento;

    this.httpService
      .informarSalida(command)
      .pipe(
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se informo la salida correctamente',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}

export interface InfomarSalida {
  idMantenimiento: number;
  fechaSalida: Date;
  observacion: string;
}
