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
import { TipoCamionHttpService } from '../services/http.service';
import { UpsertTipoCamionModel } from './model/upsert-model';

@Component({
  selector: 'app-upsert-tipo-camion-dialog',
  templateUrl: './upsert.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
  ],
})
export class UpsertTipoCamionDialogComponent implements OnInit {
  public id?: number;
  public descripcion?: string;
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpsertTipoCamionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { id?: number, descripcion?: string },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: TipoCamionHttpService,
  ) {
    this.id = data?.id;
    this.descripcion = data?.descripcion;
  }

  ngOnInit(): void {
    this.formSetup();
    //
    if(this.id){
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

    const command = this.formulario.getRawValue() as UpsertTipoCamionModel;
    command.id = this.id;

    this.alertService
      .info$('Seguro que desea actualizar el tipo de camion?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.upsert(command);
        }),
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se guardo el tipo de camion con exito',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}
