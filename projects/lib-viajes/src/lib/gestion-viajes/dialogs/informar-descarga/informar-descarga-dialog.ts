import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AlertService, ButtonComponent, ComboComponent, TextareaFormFieldComponent, DateFormFieldComponent } from 'lib-core';
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
import { switchMap } from 'rxjs';
import { InformarDescargaModel } from './models/informar-descarga-model';

@Component({
  selector: 'app-informar-descarga-dialog',
  templateUrl: './informar-descarga-dialog.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    TextareaFormFieldComponent,
    MatCheckboxModule,
    DateFormFieldComponent
],
})
export class InformarDescargaDialog implements OnInit {
  formulario: FormGroup;
  idViaje: number;

  constructor(
    private dialogRef: MatDialogRef<InformarDescargaModel>,
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: GestionViajesHttpService,
    @Inject(MAT_DIALOG_DATA) data: { idViaje: number },
  ) {
    this.idViaje = data.idViaje;
  }

    ngOnInit(): void {
        this.formSetup();
    }

  formSetup() {
    const hoy = Date.now();

    this.formulario = this.fb.group({
      fechaDescarga: [hoy, Validators.required],
      observacion: [
        ,
        Validators.compose([Validators.maxLength(200)]),
      ],
    });
  }

  guardar() {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.alertService.error$('Algunos campos contienen errores').subscribe();
      return;
    }

    const command: InformarDescargaModel = this.formulario.getRawValue();
    command.idViaje = this.idViaje;

    this.httpService.informarDescarga(command).pipe(
      switchMap(() => {
        return this.alertService.success$(
          'Exito',
          'Se cargo la descarga correctamente',
        );
      })
    ).subscribe(() => this.dialogRef.close());
  }

  salir() {
    this.dialogRef.close();
  }

  get seguridad(): FormControl {
    return this.formulario.get('seguridad') as FormControl;
  }
}
