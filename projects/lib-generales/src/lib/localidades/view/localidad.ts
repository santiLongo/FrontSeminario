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
} from 'lib-core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LocalidadGridModel } from '../models/localidad-grid-model';
import { LocalidadDataService } from '../services/data.service';
import { LocalidadFilterModel } from '../models/localidad-filter-model';
import { MatDialog } from '@angular/material/dialog';
import { UpsertLocalidadDialogComponent } from '../dialog/upsert-dialog';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.html',
  imports: [
    CoreViewComponent,
    ReactiveFormsModule,
    MatIconModule,
    FilterComponent,
    GridComponent,
    ButtonComponent,
    ComboComponent,
  ],
  providers: [LocalidadDataService],
})
export class LocalidadComponent implements OnInit {
  formulario: FormGroup;
  gridConfig: GridConfig<LocalidadGridModel>;

  constructor(
    private fb: FormBuilder,
    public dataService: LocalidadDataService,
    private dialog: MatDialog,
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
      pais: [],
      provincia: [],
    });
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        {
          key: 'idLocalidad',
          title: 'idLocalidad',
          type: 'numeric',
          hidden: true,
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
        {
          key: 'pais',
          title: 'Pais',
          type: 'text',
        },
        {
          key: 'userName',
          title: 'Usuario',
          type: 'text',
        },
        {
          key: 'userDateTime',
          title: 'Fecha Usuario',
          type: 'date',
          format: 'ddMMyyyy',
        },
      ],
      selectableSettings: {
        selectable: true,
        type: 'single',
      },
      menuActions: [
        {
          key: 'edit',
          label: 'Editar',
          icon: 'edit',
          onClick: (row) => this.update(row),
        },
      ],
      toolBarActions: [
        {
          key: 'add',
          label: 'Nueva Localidad',
          type: 'success',
          onClick: () => this.add(),
        },
        // {
        //   key: 'remove',
        //   label: 'Eliminar Localidad',
        //   type: 'danger',
        //   disabledOnEmptyRows: true,
        //   onClick: (rows) => this.remove(rows[0]),
        // },
        //Comento el boton porque no se si me conviene que eliminen localidades, ya que puedo perder trazabilidad.
      ],
    };
  }

  update(row: LocalidadGridModel) {
    this.dialog
      .open(UpsertLocalidadDialogComponent, { data: { id: row.idLocalidad }, width: '600px' })
      .afterClosed()
      .subscribe(() => this.onBuscar());
  }

  add() {
    this.dialog
      .open(UpsertLocalidadDialogComponent, {width: '600px'})
      .afterClosed()
      .subscribe(() => this.onBuscar());
  }

  remove(row: LocalidadGridModel) {
    this.alertService.warning$("Atencion","Esta seguro de eliminar la localidad?")
    .pipe(
        filter(Boolean),
        switchMap(() => {
            return this.dataService.delete(row.idLocalidad);
        }),
        switchMap(() => {
            return this.alertService.success$("Se borro la localidad con exito")
        })
    ).subscribe(() => this.onBuscar())
  }

  onBuscar() {
    const data = this.formulario.getRawValue() as LocalidadFilterModel;
    this.dataService.filterSub$.next(data);
    this.dataService.search();
  }

  get pais() {
    return this.formulario.get('pais') as FormControl;
  }
}
