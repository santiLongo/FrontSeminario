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
import { CamionesHttpService } from '../services/http.service';
import { UpsertCamionModel } from './models/upsert-model';

@Component({
  selector: 'app-upsert-localidad-dialog',
  templateUrl: './upsert-dialog.html',
  imports: [
    MatDialogModule,
    ComboComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
  ],
})
export class UpsertCamionDialogComponent implements OnInit {
  public id?: number;
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpsertCamionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { id?: number },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: CamionesHttpService,
  ) {
    this.id = data?.id;
  }

  ngOnInit(): void {
    this.formSetup();
    //
    if(this.id){
        this.httpService.get(this.id).subscribe((res) => {
            this.formulario.patchValue(res);
        })
    }
  }

  formSetup() {
    this.formulario = this.fb.group({
      idTipoCamion: [, Validators.compose([Validators.required])],
      patente: [,Validators.compose([Validators.required, Validators.maxLength(10)])],
      marca: [, Validators.compose([Validators.required, Validators.maxLength(20)])],
      modelo: [, Validators.compose([Validators.required, Validators.maxLength(20)])],
      nroChasis: [, Validators.compose([Validators.required, Validators.maxLength(50)])],
      nroMotor: [, Validators.compose([Validators.required, Validators.maxLength(50)])],
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

    const command = this.formulario.getRawValue() as UpsertCamionModel;
    command.idCamion = this.id;

    this.alertService
      .info$('Seguro que desea actualizar el camion?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.upsert(command);
        }),
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se guardo el camion con exito',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}
