import { Component, OnInit } from '@angular/core';
import { GestionCamionesDataService } from '../services/gestion-camiones-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BasicFilterComponent } from '../../../../../components/basic-filter/basic-filter.component';
import { BasicFormConfig } from '../../../../../components/basic-form/basic-form.component';
import {
  BasicGridComponent,
  BasicGridConfig,
} from '../../../../../components/basic-grid/basic-grid.component';
import { CardViewComponent } from '../../../../../components/card-view/card-view.component';

@Component({
  selector: 'app-gestion-camiones',
  templateUrl: './gestion-camiones.component.html',
  providers: [GestionCamionesDataService],
  imports: [CardViewComponent, BasicFilterComponent, BasicGridComponent],
})
export class GestionCamionesComponent implements OnInit {
  public config: BasicFormConfig[] = [];
  public gridConfig!: BasicGridConfig;
  public formulario!: FormGroup;

  constructor(public dataService: GestionCamionesDataService) {}

  ngOnInit(): void {
    this.config = [
      {
        formControlName: 'patente',
        label: 'Patente',
        row: 1,
        col: 'col-6',
        type: 'text',
      },
      {
        formControlName: 'marca',
        label: 'Marca',
        row: 1,
        col: 'col-6',
        type: 'text',
      },
      {
        formControlName: 'modelo',
        label: 'Modelo',
        row: 2,
        col: 'col-6',
        type: 'text',
      },
      {
        formControlName: 'tipoCamion',
        label: 'Tipo Camion',
        row: 2,
        col: 'col-6',
        type: 'text',
      },
      {
        formControlName: 'fechaAltaDesde',
        label: 'Fecha Alta Desde',
        row: 3,
        col: 'col-6',
        type: 'date',
      },
      {
        formControlName: 'fechaAltaHasta',
        label: 'Fecha Alta Hasta',
        row: 3,
        col: 'col-6',
        type: 'date',
      },
      {
        formControlName: 'fechaBajaDesde',
        label: 'Fecha Baja Desde',
        row: 4,
        col: 'col-6',
        type: 'date',
      },
      {
        formControlName: 'fechaBajaHasta',
        label: 'Fecha Baja Hasta',
        row: 4,
        col: 'col-6',
        type: 'date',
      },
    ];

    this.gridConfig = {
      columns: [
        {
          columnName: 'patente',
          label: 'Patente',
          type: 'text',
        },
        {
          columnName: 'marca',
          label: 'Marca',
          type: 'text',
        },
        {
          columnName: 'modelo',
          label: 'Modelo',
          type: 'text',
        },
        {
          columnName: 'nroChasis',
          label: 'Nro Chasis',
          type: 'text',
        },
        {
          columnName: 'nroMotor',
          label: 'Nro Motor',
          type: 'text',
        },
        {
          columnName: 'tipoCamion',
          label: 'Tipo Camion',
          type: 'text',
        },
        {
          columnName: 'fechaAlta',
          label: 'Fecha Alta',
          type: 'date',
        },
        {
          columnName: 'fechaBaja',
          label: 'Fecha Baja',
          type: 'date',
        },
      ],
    };
    this.formulario = new FormGroup({
      patente: new FormControl(''),
      marca: new FormControl(''),
      modelo: new FormControl(''),
      tipoCamion: new FormControl(''),
      fechaAltaDesde: new FormControl(''),
      fechaAltaHasta: new FormControl(''),
      fechaBajaDesde: new FormControl(''),
      fechaBajaHasta: new FormControl(''),
    });
    this.dataService.search();
  }

  onSearch() {
    this.dataService.filterSub$.next(this.formulario.value);
    this.dataService.search();
  }
}
