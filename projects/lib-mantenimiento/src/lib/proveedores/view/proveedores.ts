import { Component, OnInit } from '@angular/core';
import {
  CoreViewComponent,
  FilterComponent,
  GridComponent,
  ButtonComponent,
  DateFormFieldComponent,
  ComboComponent,
  ViajeMaskComponent,
  GridConfig,
  AlertService,
  DialogService,
} from 'lib-core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UpsertProveedorDialogComponent } from '../dialog/upsert-dialog';
import { filter, switchMap } from 'rxjs';
import { ProveedoresGridModel } from '../models/proveedores-grid-model';
import { ProveedoresDataService } from '../services/data.service';
import { ProveedoresFilterModel } from '../models/proveedores-filter-model';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.html',
  imports: [
    CoreViewComponent,
    ReactiveFormsModule,
    MatIconModule,
    FilterComponent,
    GridComponent,
    ButtonComponent,
    ComboComponent,
  ],
  providers: [ProveedoresDataService],
})
export class ProveedoresComponent implements OnInit {
  formulario: FormGroup;
  gridConfig: GridConfig<ProveedoresGridModel>;

  constructor(
    private fb: FormBuilder,
    public dataService: ProveedoresDataService,
    private dialog: DialogService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.formSetup();
    //
    this.gridSetup();
    //
    this.onBuscar();
  }

  formSetup() {
    this.formulario = this.fb.group({
      localidad: [],
      provincia: [],
      especialidad: []
    });
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        {
          key: 'idProveedor',
          title: 'idLocalidad',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'razonSocial',
          title: 'Proveedor',
          type: 'text',
          filter: true
        },
        {
          key: 'cuit',
          title: 'Cuit',
          type: 'numeric',
          format: 'cuit'
        },
        {
          key: 'direccion',
          title: 'Direccion',
          type: 'text',
        },
        {
          key: 'localidad',
          title: 'Localidad',
          type: 'text',
        },
        {
          key: 'provincia',
          title: 'Provincia',
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
          label: 'Nuevo Proveedor',
          type: 'success',
          onClick: () => this.add(),
        },
        {
          key: 'edit',
          label: 'Editar Proveedor',
          type: 'primary',
          disabledOnEmptyRows: true,
          onClick: (rows) => this.update(rows[0]),
        },
      ],
    };
  }

  update(row: ProveedoresGridModel) {
    this.dialog
      .open(UpsertProveedorDialogComponent, { data: { idProveedor: row.idProveedor }, size: 'xxl' })
      .afterClosed()
      .subscribe(() => this.onBuscar());
  }

  add() {
    this.dialog
      .open(UpsertProveedorDialogComponent, {size: 'xxl'})
      .afterClosed()
      .subscribe(() => this.onBuscar());
  }

  onBuscar() {
    const data = this.formulario.getRawValue() as ProveedoresFilterModel;
    this.dataService.filterSub$.next(data);
    this.dataService.search();
  }

  get provincia() {
    return this.formulario.get('provincia') as FormControl;
  }
}
