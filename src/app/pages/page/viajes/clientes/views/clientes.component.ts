import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  BasicFormComponent,
  BasicFormConfig,
} from '../../../../../components/basic-form/basic-form.component';
import { CardViewComponent } from '../../../../../components/card-view/card-view.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BasicFilterComponent } from '../../../../../components/basic-filter/basic-filter.component';
import {
  BasicGridComponent,
  BasicGridConfig,
} from '../../../../../components/basic-grid/basic-grid.component';
import { ClientesDataService } from '../services/clientes-data.service';
import { ClientesFilterModel } from '../models/clientes-filter.model';
import { ClientesGridModel } from '../models/clientes-grid.model';

@Component({
  selector: 'app-clientes-router',
  templateUrl: './clientes.component.html',
  imports: [CardViewComponent, BasicFilterComponent, BasicGridComponent],
  providers: [ClientesDataService],
})
export class ClientesComponent implements OnInit {
  public config: BasicFormConfig[] = [];
  public gridConfig: BasicGridConfig[] = [];
  public formulario: FormGroup = new FormGroup({});

  constructor(public dataService: ClientesDataService) {}

  ngOnInit(): void {
    this.config = [
      {
        formControlName: 'provincia',
        label: 'Provincia',
        row: 1,
        col: 'col-6',
        type: 'text',
      },
      {
        formControlName: 'localidad',
        label: 'Localidad',
        row: 1,
        col: 'col-6',
        type: 'text',
      },
      {
        formControlName: 'fechaAltaDesde',
        label: 'Fecha Alta Desde',
        row: 2,
        col: 'col-6',
        type: 'date',
      },
      {
        formControlName: 'fechaAltaHasta',
        label: 'Fecha Alta Hasta',
        row: 2,
        col: 'col-6',
        type: 'date',
      },
      {
        formControlName: 'fechaBajaDesde',
        label: 'Fecha Baja Desde',
        row: 3,
        col: 'col-6',
        type: 'date',
      },
      {
        formControlName: 'fechaBajaHasta',
        label: 'Fecha Baja Hasta',
        row: 3,
        col: 'col-6',
        type: 'date',
      },
    ];

    this.gridConfig = [
      { label: 'Razón Social', columnName: 'razonSocial', type: 'text' },
      { label: 'CUIT', columnName: 'cuit', type: 'text' },
      { label: 'Dirección', columnName: 'direccion', type: 'text' },
      { label: 'Teléfono', columnName: 'telefono', type: 'text' },
      { label: 'Mail', columnName: 'mail', type: 'text' },
      { label: 'Provincia', columnName: 'provincia', type: 'text' },
      { label: 'Localidad', columnName: 'localidad', type: 'text' },
      { label: 'User Alta', columnName: 'userAlta', type: 'text' },
      { label: 'Fecha Alta', columnName: 'fechaAlta', type: 'date' },
      { label: 'Fecha Baja', columnName: 'fechaBaja', type: 'date' },
    ];

    this.formulario = new FormGroup({
        provincia: new FormControl(null),
        localidad: new FormControl(null),
        fechaAltaDesde: new FormControl(null),
        fechaAltaHasta: new FormControl(null),
        fechaBajaDesde: new FormControl(null),
        fechaBajaHasta: new FormControl(null),
    });
  }

  onSearch() {
    this.dataService.filterSub$.next(this.formulario.value);
    this.dataService.search();
  }
}
