import { Component, OnInit } from '@angular/core';
import {
  CoreViewComponent,
  InputFormsModule,
  FilterComponent,
  GridComponent,
  GridConfig,
} from 'lib-core';
import {
  FormBuilder,
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { GestionViajesDataService } from '../service/data.service';
import { GestionViajesGridModel } from '../models/grid-model';

@Component({
  standalone: true,
  selector: 'app-gestion-viajes',
  templateUrl: './gestion-viajes.html',
  providers: [GestionViajesDataService],
  imports: [
    CoreViewComponent,
    InputFormsModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatIconModule,
    FilterComponent,
    GridComponent,
  ],
})
export class GestionViajesComponent implements OnInit {
  public form: FormGroup;
  public gridConfig: GridConfig<GestionViajesGridModel>;

  constructor(
    private fb: FormBuilder,
    public dataService: GestionViajesDataService,
  ) {}

  ngOnInit(): void {
    this.formSetup();
    //
    this.gridSetup();
  }

  formSetup() {
    this.form = this.fb.group({
      idCamion: [],
      idCliente: [],
      idChofer: [],
      idLocalizacionDestino: [],
      idLocalizacionProcedencia: [],
      nroViaje: [],
      fechaAltaDesde: [],
      fechaAltaHasta: [],
      estado: [],
    });
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        { key: 'idViaje', title: 'ID Viaje', hidden: true },
        { key: 'nroViaje', title: 'Nro. Viaje' },
        { key: 'estado', title: 'Estado' },
        { key: 'cliente', title: 'Cliente' },
        { key: 'chofer', title: 'Chofer' },
        { key: 'patenteCamion', title: 'Patente del Camion' },
        { key: 'carga', title: 'Carga' },
        { key: 'kilometros', title: 'Kilometros' },
        { key: 'montoTotal', title: 'Monto Total' },
        { key: 'fechaPartida', title: 'Fecha de Partida' },
        { key: 'fechaDescarga', title: 'Fecha de Descarga' },
        { key: 'userName', title: 'Nombre de Usuario' },
        { key: 'userDateTime', title: 'Fecha de Usuario' },
      ],
    };
  }

  onBuscar() {
    this.dataService.filterSub$.next(this.form.value);
    this.dataService.search();
  }
}
