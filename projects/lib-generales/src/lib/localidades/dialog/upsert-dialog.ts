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
import { UpsertLocalidadModel } from './models/upsert-model';
import { LocalidadHttpService } from '../services/http.service';
import { filter, switchMap } from 'rxjs';

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
export class UpsertLocalidadDialogComponent implements OnInit {
  public id?: number;
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpsertLocalidadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { id?: number },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: LocalidadHttpService,
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
      descripcion: [
        ,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      idProvincia: [, Validators.compose([Validators.required])],
      idPais: [],
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

    const command = this.formulario.getRawValue() as UpsertLocalidadModel;
    command.id = this.id;

    this.alertService
      .info$('Seguro que desea actualizar la localidad?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.upsert(command);
        }),
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se guardo la localidad con exito',
          );
        }),
      )
      .subscribe(() => this.salir());
  }

  get pais() {
    return this.formulario.get('idPais') as FormControl;
  }
}
