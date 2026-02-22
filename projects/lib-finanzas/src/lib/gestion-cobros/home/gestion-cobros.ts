import { Component } from '@angular/core';
import { CobrosDataService } from '../services/data.service';
import {
  FormGroup,
  FormBuilder,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  GridConfig,
  AlertService,
  GridComponent,
  ButtonComponent,
  CoreViewComponent,
  FilterComponent,
  ViajeMaskComponent,
  ComboComponent,
  DateFormFieldComponent,
  DialogService,
} from 'lib-core';
import { CobrosGridModel } from '../models/cobros-grid-model';
import { CobrosFilterModel } from '../models/cobros-filter-model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UpdateCobroDialogComponent } from '../dialogs/update-cobro/update-cobro';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-gestion-cobros',
  templateUrl: './gestion-cobros.html',
  imports: [
    GridComponent,
    ButtonComponent,
    CoreViewComponent,
    FilterComponent,
    ViajeMaskComponent,
    ComboComponent,
    DateFormFieldComponent,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  providers: [CobrosDataService],
})
export class GestionCobrosComponent {
  formulario: FormGroup;
  gridConfig: GridConfig<CobrosGridModel>;

  constructor(
    private fb: FormBuilder,
    public dataService: CobrosDataService,
    private dialog: DialogService,
    private alertService: AlertService,
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
      nroViaje: [],
      formaPago: [],
      fechaDesde: [],
      fechaHasta: [],
      estado: [4],
    });
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        {
          key: 'estado',
          title: 'Estado',
          type: 'text',
          sortable: false,
        },
        {
          key: 'nroViaje',
          title: 'Nro. Viaje',
          type: 'text',
          filter: true,
        },
        {
          key: 'fechaRecibo',
          title: 'Fecha Recibido',
          type: 'date',
          format: 'ddMMyyyy',
          sortable: true,
        },
        {
          key: 'monto',
          title: 'Monto',
          type: 'numeric',
          format: '{0:2}',
        },
        {
          key: 'moneda',
          type: 'text',
          title: 'Moneda',
          filter: true,
        },
        {
          key: 'formaPago',
          title: 'Forma de Pago',
          type: 'text',
          filter: true,
        },
        {
          key: 'idCobro',
          title: 'id',
          type: 'numeric',
          hidden: true,
        },
      ],
      selectableSettings: {
        selectable: true,
        type: 'single',
      },
      //   menuActions: [
      //   ],
      toolBarActions: [
        {
          key: 'update',
          label: 'Modificar Cobro',
          type: 'secondary',
          disabledOnEmptyRows: true,
          disabled: (rows) => rows[0].estado === 'Anulado',
          onClick: (rows) => this.update(rows[0]),
        },
        {
          key: 'anular',
          label: 'Anular Cobro',
          type: 'warning',
          disabledOnEmptyRows: true,
          disabled: (rows) => rows[0].estado === 'Anulado',
          onClick: (rows) => this.anular(rows[0]),
        },
      ],
    };
  }

  onBuscar() {
    const data = this.formulario.getRawValue() as CobrosFilterModel;
    this.dataService.filterSub$.next(data);
    this.dataService.search();
  }

  update(row: CobrosGridModel) {
    this.dialog
      .open(UpdateCobroDialogComponent, {
        data: {
          idCobro: row.idCobro,
        },
        size: 'xxl',
      })
      .afterClosed()
      .subscribe(() => this.onBuscar());
  }

  anular(row: CobrosGridModel) {
    this.dataService
      .anular(row.idCobro)
      .pipe(
        switchMap(() => {
          return this.alertService.success$(
            'Exito',
            'Se anulo el cobro correctamente',
          );
        }),
      )
      .subscribe(() => this.onBuscar());
  }

  get estado(): FormControl {
    return this.formulario.get('estado') as FormControl;
  }
}
