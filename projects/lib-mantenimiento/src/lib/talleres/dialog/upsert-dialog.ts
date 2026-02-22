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
  CuitMaskComponent,
  NumberFormFieldComponent,
  GridComponent,
  GridConfig,
  DialogService,
} from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { TalleresHttpService } from '../services/http.service';
import {
  UpsertEspecialidadTaller,
  UpsertTallerModel,
} from './models/upsert-model';
import { UpsertDataService } from './data.service';
import { EspecialidadDialogComponent } from '../../shared/especialidad/especialidad';
import { EspecialidadGridModel } from '../../shared/especialidad/models/especialidad-grid';

@Component({
  selector: 'app-upsert-localidad-dialog',
  templateUrl: './upsert-dialog.html',
  imports: [
    MatDialogModule,
    ComboComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    CuitMaskComponent,
    NumberFormFieldComponent,
    GridComponent,
  ],
  providers: [UpsertDataService],
})
export class UpsertLocalidadDialogComponent implements OnInit {
  public idTaller?: number;
  public formulario: FormGroup;
  public config: GridConfig<UpsertEspecialidadTaller>;

  constructor(
    private dialogRef: MatDialogRef<UpsertLocalidadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { idTaller?: number },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: TalleresHttpService,
    public dataService: UpsertDataService,
    private dialog: DialogService,
  ) {
    this.idTaller = data?.idTaller;
  }

  ngOnInit(): void {
    this.formSetup();
    //
    this.gridSetup();
    //
    if (this.idTaller) {
      this.httpService.get(this.idTaller).subscribe((res) => {
        this.formulario.patchValue(res);
      });
    }
  }

  formSetup() {
    this.formulario = this.fb.group({
      nombre: [
        ,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      cuit: [,Validators.compose([Validators.maxLength(11)])],
      direccion: [
        ,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      telefono: [, Validators.compose([Validators.maxLength(11)])],
      responsable: [, Validators.compose([Validators.maxLength(50)])],
      mail: [, Validators.compose([Validators.maxLength(50)])],
      idLocalidad: [, Validators.required],
    });
  }

  gridSetup() {
    this.config = {
      columns: [
        {
          key: 'idEspecialidad',
          title: 'Id',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'descripcion',
          title: 'Especialidad',
          type: 'text',
        },
      ],
      selectableSettings: {
        selectable: true,
        type: 'single',
      },
      toolBarActions: [
        {
          key: 'add',
          label: 'Agregar Especialidad',
          type: 'success',
          onClick: () =>
            this.agregarEspecialidades()
        },
        {
          key: 'eliminar',
          label: 'Eliminar Especialidad',
          type: 'danger',
          onClick: (rows) => this.dataService.remove(rows[0]),
        },
      ],
    };
  }

  agregarEspecialidades() {
    this.dialog.open(EspecialidadDialogComponent, {
      data: { esSelecteable: true }, size: 'xxl'
    }).afterClosed().subscribe((esp: UpsertEspecialidadTaller[]) => {
      const data = esp;
      this.dataService.addAll(data);
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

    const command = this.formulario.getRawValue() as UpsertTallerModel;
    command.idTaller = this.idTaller;
    command.especialidades = this.dataService.data;

    if(command.especialidades.length <= 0){
      this.alertService.error$('Tiene que cargar al menos una especialidad').subscribe();
      return;
    }

    this.alertService
      .info$('Seguro que desea actualizar el taller?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.upsert(command);
        }),
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se guardo el taller con exito',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}
