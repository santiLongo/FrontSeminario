import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AlertService, ButtonComponent, ComboComponent, TextareaFormFieldComponent, BasicDialogComponent } from 'lib-core';
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
import { ForzarEstadoModel } from './models/forzar-estado-model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-forzar-estado-dialog',
  templateUrl: './forzar-estado-dialog.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    ComboComponent,
    FormsModule,
    ReactiveFormsModule,
    TextareaFormFieldComponent,
    MatCheckboxModule
],
})
export class ForzarEstadoDialog implements OnInit {
  formulario: FormGroup;
  idViaje: number;

  constructor(
    private dialogRef: MatDialogRef<ForzarEstadoDialog>,
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
    this.formulario = this.fb.group({
      estado: [, Validators.required],
      observacion: [
        ,
        Validators.compose([Validators.maxLength(200)]),
      ],
      seguridad: [false],
    });
  }

  forzarEstado() {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.alertService.error$('Algunos campos contienen errores').subscribe();
      return;
    }

    const command: ForzarEstadoModel = this.formulario.getRawValue();
    command.idViaje = this.idViaje;

    this.httpService.forzarEstado(command).pipe(
      switchMap(() => {
        return this.alertService.success$(
          'Exito',
          'Se actualizo el estado correctamente',
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
