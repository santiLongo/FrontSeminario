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
  NumberFormFieldComponent,
} from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { ChoferesHttpService } from '../../services/http.service';
import { UpsertChoferModel } from './models/upsert-model';

@Component({
  selector: 'app-upsert-localidad-dialog',
  templateUrl: './upsert-dialog.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    NumberFormFieldComponent
  ],
})
export class UpsertChoferDialogComponent implements OnInit {
  public id?: number;
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpsertChoferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { id?: number },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: ChoferesHttpService,
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
      nombre: [, Validators.compose([Validators.required, Validators.maxLength(20)])],
      apellido: [,Validators.compose([Validators.required, Validators.maxLength(20)])],
      telefono: [,Validators.compose([Validators.max(11)])],
      dni: [, Validators.compose([Validators.required, Validators.max(11)])],
      direccion: [,Validators.compose([Validators.maxLength(50)])],
      nroRegistro: [, Validators.compose([Validators.required, Validators.maxLength(50)])],
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

    const command = this.formulario.getRawValue() as UpsertChoferModel;
    command.idChofer = this.id;

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
