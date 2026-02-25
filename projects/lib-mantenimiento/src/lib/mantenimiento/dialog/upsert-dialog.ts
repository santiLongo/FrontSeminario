import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ComboComponent, ButtonComponent, FormFieldComponent, AlertService, CuitMaskComponent, NumberFormFieldComponent, GridComponent, GridConfig, DialogService, DateFormFieldComponent, DecimalFormFieldComponent } from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { MantenimientoHttpService } from '../services/http.service';
import { UpsertDataService } from './data.service';
import { UpsertMantenimientoModel, UpsertTareas } from './models/upsert-model';

@Component({
  selector: 'app-upsert-localidad-dialog',
  templateUrl: './upsert-dialog.html',
  imports: [
    MatDialogModule,
    ComboComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    GridComponent,
    DateFormFieldComponent,
    DecimalFormFieldComponent,
    FormsModule
],
  providers: [UpsertDataService],
})
export class UpsertProveedorDialogComponent implements OnInit {
  @ViewChild('costoEditTemplate', {static: true}) costoEditTemplate: TemplateRef<any>
  public idMantenimiento?: number;
  public formulario: FormGroup;
  public config: GridConfig<UpsertTareas>;
  public costo: FormControl;

  constructor(
    private dialogRef: MatDialogRef<UpsertProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { idMantenimiento?: number },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: MantenimientoHttpService,
    public dataService: UpsertDataService,
  ) {
    this.idMantenimiento = data?.idMantenimiento;
  }

  ngOnInit(): void {
    this.costo = this.fb.control([]);
    //
    this.formSetup();
    //
    this.gridSetup();
    //
    if (this.idMantenimiento) {
      this.httpService
        .get(this.idMantenimiento)
        .subscribe((res: UpsertMantenimientoModel) => {
          this.dataService.addAll(res.tareas);
          this.formulario.patchValue({
            titulo: res.titulo,
            idCamion: res.idCamion,
            idTaller: res.idTaller,
            fechaEntrada: res.fechaEntrada,
          });
        });
    }
  }

  formSetup() {
    this.formulario = this.fb.group({
      titulo: [,Validators.compose([Validators.required, Validators.maxLength(50)])],
      idCamion: [, Validators.required],
      idTaller: [, Validators.required],
      fechaEntrada: [, Validators.required],
    });
  }

  gridSetup() {
    this.config = {
      columns: [
        {
          key: 'idTarea',
          title: 'Id',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'descripcion',
          title: 'Tarea',
          type: 'text',
          editable: true
        },
        {
          key: 'costo',
          title: 'Costo',
          type: 'numeric',
          format: '{0:2}',
          editable: true,
          editTemplate: this.costoEditTemplate
        },
      ],
      selectableSettings: {
        selectable: true,
        type: 'single',
      },
      isEditable: true
    };
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

    const command = this.formulario.getRawValue() as UpsertMantenimientoModel;
    command.idMantenimiento = this.idMantenimiento;
    command.tareas = this.dataService.data;

    if (command.tareas.length <= 0) {
      this.alertService
        .error$('Tiene que cargar al menos una especialidad')
        .subscribe();
      return;
    }

    this.alertService
      .info$('Seguro que desea actualizar el mantenimiento?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.upsert(command);
        }),
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se guardo el mantenimiento con exito',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}
