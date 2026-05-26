import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AlertService,
  ButtonComponent,
  DateFormFieldComponent,
  FormFieldComponent,
} from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { PendientesConfirmarHttpService } from '../../services/http.service';
import { ConfirmarFacturaModel } from './models/model';

@Component({
  selector: 'app-confirmar-pendiente-dialog',
  templateUrl: './confirmar-dialog.html',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormFieldComponent,
    DateFormFieldComponent,
  ],
})
export class ConfirmarPendienteDialogComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ConfirmarPendienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { idFactura: number; numero: number; tipo: number },
    private fb: FormBuilder,
    private httpService: PendientesConfirmarHttpService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      cae: [null],
      caeFchVto: [null],
      tipoComprobante: [null],
    });
  }

  get tipoLabel(): string {
    return this.data.tipo === 1 ? 'Emitida' : 'Recibida';
  }

  confirmar() {
    const raw = this.formulario.getRawValue();
    const command: ConfirmarFacturaModel = {
      cae: raw.cae || undefined,
      caeFchVto: raw.caeFchVto || undefined,
      tipoComprobante: raw.tipoComprobante || undefined,
    };

    this.alertService
      .info$(`¿Confirmar la factura #${this.data.numero}?`)
      .pipe(
        filter(Boolean),
        switchMap(() => {
          if (this.data.tipo === 1) {
            return this.httpService.confirmarEmitida(
              this.data.idFactura,
              command,
            );
          }
          return this.httpService.confirmarRecibida(
            this.data.idFactura,
            command,
          );
        }),
        switchMap(() =>
          this.alertService.success$(
            'Éxito',
            'Factura confirmada correctamente',
          ),
        ),
      )
      .subscribe(() => this.dialogRef.close(true));
  }

  salir() {
    this.dialogRef.close();
  }
}
