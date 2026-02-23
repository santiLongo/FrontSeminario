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
import { UpsertTallerDialogComponent } from '../dialog/upsert-dialog';
import { filter, switchMap } from 'rxjs';
import { TalleresGridModel } from '../models/talleres-grid-model';
import { TalleresDataService } from '../services/data.service';
import { TalleresFilterModel } from '../models/talleres-filter-model';

@Component({
  selector: 'app-localidad',
  templateUrl: './talleres.html',
  imports: [
    CoreViewComponent,
    ReactiveFormsModule,
    MatIconModule,
    FilterComponent,
    GridComponent,
    ButtonComponent,
    ComboComponent,
  ],
  providers: [TalleresDataService],
})
export class TalleresComponent implements OnInit {
  formulario: FormGroup;
  gridConfig: GridConfig<TalleresGridModel>;

  constructor(
    private fb: FormBuilder,
    public dataService: TalleresDataService,
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
          key: 'idTaller',
          title: 'idLocalidad',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'nombre',
          title: 'Taller',
          type: 'text',
        },
        {
          key: 'cuit',
          title: 'Cuit',
          type: 'numeric',
          format: 'cuit'
        },
        {
          key: 'telefono',
          title: 'Telefono',
          type: 'numeric',
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
          label: 'Nuevo Taller',
          type: 'success',
          onClick: () => this.add(),
        },
        {
          key: 'edit',
          label: 'Editar Taller',
          type: 'primary',
          disabledOnEmptyRows: true,
          onClick: (rows) => this.update(rows[0]),
        },
      ],
    };
  }

  update(row: TalleresGridModel) {
    this.dialog
      .open(UpsertTallerDialogComponent, { data: { idTaller: row.idTaller }, size: 'xxl' })
      .afterClosed()
      .subscribe(() => this.onBuscar());
  }

  add() {
    this.dialog
      .open(UpsertTallerDialogComponent, {size: 'xxl'})
      .afterClosed()
      .subscribe(() => this.onBuscar());
  }

  onBuscar() {
    const data = this.formulario.getRawValue() as TalleresFilterModel;
    this.dataService.filterSub$.next(data);
    this.dataService.search();
  }

  get provincia() {
    return this.formulario.get('provincia') as FormControl;
  }
}
