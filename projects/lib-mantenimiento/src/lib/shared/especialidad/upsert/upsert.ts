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
import {
  ComboComponent,
  ButtonComponent,
  FormFieldComponent,
  AlertService,
} from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { UpsertEspecialidadModel } from './model/upsert-model';
import { EspecialidadHttpService } from '../services/http.service';

@Component({
  selector: 'app-upsert-especialidad-dialog',
  templateUrl: './upsert.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
  ],
})
export class UpsertEspecialidadDialogComponent implements OnInit {
  public idEspecialidad?: number;
  public descripcion?: string;
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpsertEspecialidadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { idEspecialidad?: number, descripcion?: string },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: EspecialidadHttpService,
  ) {
    this.idEspecialidad = data?.idEspecialidad;
    this.descripcion = data?.descripcion;
  }

  ngOnInit(): void {
    this.formSetup();
    //
    if(this.idEspecialidad){
        this.formulario.patchValue({descripcion: this.descripcion});
    }
  }

  formSetup() {
    this.formulario = this.fb.group({
      descripcion: [, Validators.compose([Validators.required, Validators.maxLength(50)])],
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

    const command = this.formulario.getRawValue() as UpsertEspecialidadModel;
    command.idEspecialidad = this.idEspecialidad;

    this.alertService
      .info$('Seguro que desea actualizar la especialidad?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.upsert(command);
        }),
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se guardo la especialidad con exito',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}
