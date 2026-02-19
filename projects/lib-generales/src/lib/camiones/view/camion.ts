import { AfterViewInit, Component, model, OnInit } from '@angular/core';
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
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CamionesGridModel } from '../models/camiones-grid-model';
import { CamionesDataService } from '../services/data.service';
import { CamionesFilterModel } from '../models/camiones-filter-model';
import { UpsertCamionDialogComponent } from '../dialog/upsert-dialog';
import { switchMap } from 'rxjs';
import { TipoCamionDialogComponent } from '../tipo-camion/tipo-camion';

@Component({
  selector: 'app-camion',
  templateUrl: './camion.html',
  imports: [
    CoreViewComponent,
    ReactiveFormsModule,
    MatIconModule,
    FilterComponent,
    GridComponent,
    ButtonComponent,
    ComboComponent,
  ],
  providers: [CamionesDataService],
})
export class CamionComponent implements OnInit, AfterViewInit {
  gridConfig: GridConfig<CamionesGridModel>;
  formulario: FormGroup;

  constructor(public dataService: CamionesDataService, private fb: FormBuilder, private dialog: DialogService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.formSetup();
    //
    this.gridSetup();
    //
  }

  ngAfterViewInit(): void {
    this.onBuscar();
  }

  formSetup() {
    this.formulario = this.fb.group({
      camion: [],
      marca: [],
      modelo: [],
      tipoCamion: [],
    });
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        { key: 'id', title: 'ID', type: 'numeric', hidden: true },
        { key: 'patente', title: 'Patente', type: 'text', filter: true, sortable: true },
        { key: 'marca', title: 'Marca', type: 'text' },
        { key: 'modelo', title: 'Modelo', type: 'text' },
        { key: 'nroChasis', title: 'Nro Chasis', type: 'text' },
        { key: 'nroMotor', title: 'Nro Motor', type: 'text' },
        { key: 'tipoCamion', title: 'Tipo Camion', type: 'text' },
        { key: 'fechaAlta', title: 'Fecha Alta', type: 'date' },
        { key: 'fechaBaja', title: 'Fecha Baja', type: 'date' },
        { key: 'ultimoViaje', title: 'Ultimo Viaje', type: 'date' },
        {
          key: 'ultimoMantenimiento',
          title: 'Ultimo Mantenimiento',
          type: 'date',
        },
      ],
      selectableSettings: {
        selectable: true,
        type: 'single',
      },
      toolBarActions: [
        {
          key: 'new',
          icon: 'truck',
          label: 'Alta de Camion',
          type: 'success',
          onClick: () => {
            this.openUpsert()
          }
        },
        {
          key: 'edit',
          icon: 'edit',
          label: 'Editar Camion',
          type: 'primary',
          disabledOnEmptyRows: true,
          onClick: (rows) => {
            this.openUpsert(rows[0].id)
          }
        },
        {
          key: 'newTipoCamion',
          icon: 'add',
          label: 'Nuevo Tipo Camion',
          type: 'secondary',
          onClick: (rows) => {
            this.openTipoCamion()
          }
        }
      ],
      menuActions: [
        {
          key: 'darBaja',
          label: 'Dar Baja',
          icon: 'close',
          onClick: (row) => {
            this.darBaja(row.id);
          },
          hidden: (row) => !!row.fechaBaja
        },
        {
          key: 'darAlta',
          label: 'Dar Alta',
          icon: 'success',
          onClick: (row) => {
            this.darAlta(row.id);
          },
          hidden: (row) => !row.fechaBaja
        }
      ]
    };
  }

  onBuscar() {
    const command = this.formulario.getRawValue() as CamionesFilterModel;
    this.dataService.filterSub$.next(command);
    this.dataService.search();
  }

  openUpsert(id?: number) {
    this.dialog.open(UpsertCamionDialogComponent, {data: { id }, size: 'l'}).afterClosed().subscribe(() => {
      this.onBuscar();
    });
  }

  darBaja(id: number) {
    this.dataService.darBaja(id).pipe(
      switchMap(() => {
        return this.alertService.success$('Camion dado de baja con exito');
      })
    ).subscribe(() => this.onBuscar());
  }

  darAlta(id: number) {
    this.dataService.darAlta(id).pipe(
      switchMap(() => {
        return this.alertService.success$('Camion dado de alta con exito');
      })
    ).subscribe(() => this.onBuscar());
  }

  openTipoCamion() {
    this.dialog.open(TipoCamionDialogComponent, { size: 'xxl' }).afterClosed().subscribe(() => {
      this.onBuscar();
    });
  }

  get marca() {
    return this.formulario.get('marca') as FormControl;
  }

  get modelo() {
    return this.formulario.get('modelo') as FormControl;
  }

  get tipoCamion() {
    return this.formulario.get('tipoCamion') as FormControl;
  }
}
