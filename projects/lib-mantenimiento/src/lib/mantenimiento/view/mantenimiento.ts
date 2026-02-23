import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { filter, Subject, switchMap } from 'rxjs';
import { MantenimientoGridModel } from '../models/mantenimentos-grid-model';
import { MantenimientoDataService } from '../services/data.service';
import { MantenimientoFilterModel } from '../models/mantenimentos-filter-model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.html',
  imports: [
    CoreViewComponent,
    ReactiveFormsModule,
    MatIconModule,
    FilterComponent,
    GridComponent,
    ButtonComponent,
    ComboComponent,
    DateFormFieldComponent,
    MatButtonToggleModule
],
  providers: [MantenimientoDataService],
})
export class MantenimientosComponent implements OnInit {
  formulario: FormGroup;
  gridConfig: GridConfig<MantenimientoGridModel>;

  private destroy$ = new Subject<void>()

  constructor(
    private fb: FormBuilder,
    public dataService: MantenimientoDataService,
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
      estado: [1],
      taller: [],
      camion: [],
      fechaEntradaDesde: [],
      fechaEntradaHasta: []
    });
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        {
          key: 'idMantenimiento',
          title: 'idLocalidad',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'titulo',
          title: 'Titulo',
          type: 'text',
          filter: true
        },
        {
          key: 'estado',
          title: 'Estado',
          type: 'text'
        },
        {
          key: 'camion',
          title: 'Camion',
          type: 'text'
        },
        {
          key: 'taller',
          title: 'Taller',
          type: 'text'
        },
        {
          key: 'importe',
          title: 'Importe',
          type: 'numeric',
          format: '{0:2}'
        },
        {
          key: 'fechaEntrada',
          title: 'Fecha de Entrada',
          type: 'date',
          format: 'ddMMyyyy'
        },
        {
          key: 'fechaSalida',
          title: 'Fecha de Salida',
          type: 'date',
          format: 'ddMMyyyy'
        },
      ],
      selectableSettings: {
        selectable: true,
        type: 'single',
      },
      toolBarActions: [
        {
          key: 'add',
          label: 'Ingresar un Mantenimiento',
          type: 'primary',
          position: 'right',
          onClick: () => this.add(),
        },
        {
          key: 'edit',
          label: 'Editar un Mantenimiento',
          type: 'secondary',
          position: 'right',
          disabledOnEmptyRows: true,
          onClick: (rows) => this.update(rows[0]),
        },
        {
          key: 'salida',
          label: 'Informar un Salida',
          type: 'success',
          disabledOnEmptyRows: true,
          onClick: (rows) => this.update(rows[0]),
        },
        {
          key: 'importe',
          label: 'Informar un Importe',
          type: 'success',
          disabledOnEmptyRows: true,
          onClick: (rows) => this.update(rows[0]),
        },
        {
          key: 'observaciones',
          label: 'Ver un Observaciones',
          type: 'light',
          disabledOnEmptyRows: true,
          onClick: (rows) => this.update(rows[0]),
        },
      ],
    };
  }

  update(row: MantenimientoGridModel) {
    this.dialog
      .open(UpsertProveedorDialogComponent, { data: { idMantenimiento: row.idMantenimiento }, size: 'xxl' })
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
    const data = this.formulario.getRawValue() as MantenimientoFilterModel;
    this.dataService.filterSub$.next(data);
    this.dataService.search();
  }

  get estado() {
    return this.formulario.get('estado') as FormControl;
  }
}
