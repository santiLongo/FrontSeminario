import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
  DateFormFieldComponent,
  TextareaFormFieldComponent,
  DialogService,
} from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { EventosHttpService } from './services/http.service';
import { EventoUpsertModel } from './models/upsert-model';
@Component({
  selector: 'app-upsert-evento-dialog',
  templateUrl: './upsert-evento.html',
  imports: [
    MatDialogModule,
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    ComboComponent,
    DateFormFieldComponent,
    TextareaFormFieldComponent,
  ],
})
export class UpsertEventoDialogComponent implements OnInit {
  @ViewChild('combo') combo: ComboComponent;
  public idEvento?: number;
  public formulario: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpsertEventoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { idEvento?: number },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: EventosHttpService,
    private dialogService: DialogService,
  ) {
    this.idEvento = data?.idEvento;
  }

  ngOnInit(): void {
    this.formSetup();
    //
    if (this.idEvento) {
      this.httpService.get(this.idEvento).subscribe((res) => {
        this.formulario.patchValue(res);
      });
    }
  }

  formSetup() {
    this.formulario = this.fb.group({
      titulo: [
        ,
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      descripcion: [, Validators.maxLength(200)],
      fechaEvento: [, Validators.required],
      inactivo: [false],
      idTipoEvento: [, Validators.required],
    });
  }

  salir() {
    this.dialogRef.close();
  }

  async tipoEvento() {
    const { TipoEventoDialogComponent } = await import('./upsert-tipo/tipo-evento');
  
    this.dialogService
        .open(TipoEventoDialogComponent, { size: 'l' })
        .afterClosed()
        .subscribe(() => (this.combo.loaded = false));
  }

  guardar() {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.alertService.error$('Algunos campos contienen errores').subscribe();
      return;
    }

    const command = this.formulario.getRawValue() as EventoUpsertModel;
    command.idEvento = this.idEvento;

    this.alertService
      .info$('Seguro que desea actualizar el evento?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.upsert(command);
        }),
        switchMap(() => {
          return this.alertService.success$('Exito', 'Se guardo el evento');
        }),
      )
      .subscribe(() => this.salir());
  }
}
