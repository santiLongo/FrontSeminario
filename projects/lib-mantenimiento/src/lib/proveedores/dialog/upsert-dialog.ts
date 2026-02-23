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
import { ProveedoresHttpService } from '../services/http.service';
import {
  UpsertEspecialidadProveedor,
  UpsertProveedorModel,
} from './models/upsert-model';
import { UpsertDataService } from './data.service';
import { EspecialidadDialogComponent } from '../../shared/especialidad/especialidad';

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
    GridComponent
],
  providers: [UpsertDataService],
})
export class UpsertProveedorDialogComponent implements OnInit {
  public idProveedor?: number;
  public formulario: FormGroup;
  public config: GridConfig<UpsertEspecialidadProveedor>;

  constructor(
    private dialogRef: MatDialogRef<UpsertProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { idProveedor?: number },
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: ProveedoresHttpService,
    public dataService: UpsertDataService,
    private dialog: DialogService,
  ) {
    this.idProveedor = data?.idProveedor;
  }

  ngOnInit(): void {
    this.formSetup();
    //
    this.gridSetup();
    //
    if (this.idProveedor) {
      this.httpService.get(this.idProveedor).subscribe((res: UpsertProveedorModel) => {
        this.dataService.addAll(res.especialidades);
        this.formulario.patchValue({
          razonSocial: res.razonSocial,
          cuit: res.cuit.toString(),
          direccion: res.direccion,
          responsable: res.responsable,
          mail: res.mail,
          idLocalidad: res.idLocalidad,
        });
      });
    }
  }

  formSetup() {
    this.formulario = this.fb.group({
      razonSocial: [
        ,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      cuit: [, Validators.compose([Validators.maxLength(11)])],
      direccion: [
        ,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
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
          onClick: () => this.agregarEspecialidades(),
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
    this.dialog
      .open(EspecialidadDialogComponent, {
        data: { esSelecteable: true },
        size: 'xxl',
      })
      .afterClosed()
      .subscribe((esp: UpsertEspecialidadProveedor[]) => {
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

    const command = this.formulario.getRawValue() as UpsertProveedorModel;
    command.idProveedor = this.idProveedor;
    command.especialidades = this.dataService.data;

    if (command.especialidades.length <= 0) {
      this.alertService
        .error$('Tiene que cargar al menos una especialidad')
        .subscribe();
      return;
    }

    this.alertService
      .info$('Seguro que desea actualizar el proveedor?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this.httpService.upsert(command);
        }),
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se guardo el proveedor con exito',
          );
        }),
      )
      .subscribe(() => this.salir());
  }
}
