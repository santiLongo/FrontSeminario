import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ComboComponent, ButtonComponent, FormFieldComponent, AlertService, TextareaFormFieldComponent } from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { TipoEventoHttpService } from '../services/http.service';
import { UpsertTipoEventoModel } from './model/upsert-model';

@Component({
  selector: 'app-upsert-tipo-camion-dialog',
  templateUrl: './upsert.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    TextareaFormFieldComponent
],
})
export class UpsertTipoEventoDialogComponent implements OnInit {
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpsertTipoEventoDialogComponent>,
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: TipoEventoHttpService,
  ) {
  }

  ngOnInit(): void {
    this.formSetup();
  }

  formSetup() {
    this.formulario = this.fb.group({
      nombre: [,Validators.compose([Validators.required, Validators.maxLength(100)])],
      descripcion: [, Validators.compose([Validators.required, Validators.maxLength(200)])],
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

    const command = this.formulario.getRawValue() as UpsertTipoEventoModel;

    this.alertService
      .info$('Seguro que desea crear un tipo de evento?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.add(command);
        }),
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se guardo el tipo de evento con exito',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}
