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
import { ComboComponent, ButtonComponent, FormFieldComponent, AlertService, NumberFormFieldComponent, CuitMaskComponent } from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { ClientesHttpService } from '../services/http.service';
import { ClienteUpsertModel } from './model/upsert-model';

@Component({
  selector: 'app-upsert-chofer-dialog',
  templateUrl: './upsert-dialog.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    NumberFormFieldComponent,
    CuitMaskComponent
],
})
export class UpsertClienteDialogComponent implements OnInit {
  public idCliente?: number;
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpsertClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { idCliente?: number },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: ClientesHttpService,
  ) {
    this.idCliente = data?.idCliente;
  }

  ngOnInit(): void {
    this.formSetup();
    //
    if(this.idCliente){
        this.httpService.get(this.idCliente).subscribe((res: ClienteUpsertModel) => {
            this.formulario.patchValue({
                cuit: res.cuit,          
                razonSocial: res.razonSocial,
                direccion: res.direccion,
                telefono: res.telefono,
                email: res.email,
            });
        })
    }
  }

  formSetup() {
    this.formulario = this.fb.group({
      cuit: [, Validators.compose([Validators.required])],
      razonSocial: [,Validators.compose([Validators.required, Validators.maxLength(50)])],
      direccion: [,Validators.compose([Validators.maxLength(30)])],
      telefono: [, Validators.compose([Validators.max(1999999999)])],
      email: [,Validators.compose([Validators.maxLength(50)])],
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

    const command = this.formulario.getRawValue() as ClienteUpsertModel;
    command.idCliente = this.idCliente;

    this.alertService
      .info$('Seguro que desea actualizar el cliente?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.upsert(command);
        }),
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se guardo el cliente con exito',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}
