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
  selector: 'app-infomar-importe-dialog',
  templateUrl: './informar-importe.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    TextareaFormFieldComponent,
    DecimalFormFieldComponent
],
})
export class InformarImporteDialogComponent implements OnInit {
  public idMantenimiento: number;
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<InformarImporteDialogComponent>,
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
      importe: [, Validators.compose([Validators.required])],
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

    const command = this.formulario.getRawValue() as InfomarImporte;
    command.idMantenimiento = this.idMantenimiento;

    this.httpService
      .informarImporte(command)
      .pipe(
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se informo el importe correctamente',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}

export interface InfomarImporte {
  idMantenimiento: number;
  importe: number;
  observacion: string;
}
