import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CoreViewComponent, FilterComponent, GridComponent, GridConfig, ButtonComponent, DateFormFieldComponent, ComboComponent, ViajeMaskComponent } from 'lib-core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { GestionViajesDataService } from '../service/data.service';
import { GestionViajesGridModel } from '../models/grid-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-gestion-viajes',
  templateUrl: './gestion-viajes.html',
  providers: [GestionViajesDataService],
  imports: [
    CoreViewComponent,
    ReactiveFormsModule,
    MatIconModule,
    FilterComponent,
    GridComponent,
    ButtonComponent,
    DateFormFieldComponent,
    ComboComponent,
    ViajeMaskComponent
],
})
export class GestionViajesComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public gridConfig: GridConfig<GestionViajesGridModel>;

  constructor(
    private fb: FormBuilder,
    public dataService: GestionViajesDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.formSetup();
    //
    this.gridSetup();
  }

  ngAfterViewInit(): void {
    this.onBuscar();
  }

  formSetup() {
    this.form = this.fb.group({
      idCamion: [],
      idCliente: [],
      idChofer: [],
      idLocalidadDestino: [],
      idLocalidadProcedencia: [],
      nroViaje: [],
      fechaAltaDesde: [],
      fechaAltaHasta: [],
      estado: [],
      decimal: []
    });
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        { key: 'idViaje', title: 'ID Viaje', type: 'numeric', hidden: true },
        { key: 'nroViaje', title: 'Nro. Viaje', type: 'text' },
        { key: 'estado', title: 'Estado', type: 'text' },
        { key: 'cliente', title: 'Cliente', type: 'text' },
        { key: 'chofer', title: 'Chofer', type: 'text' },
        { key: 'patente', title: 'Patente del Camion', type: 'text' },
        { key: 'carga', title: 'Carga', type: 'text' },
        {
          key: 'kilometros',
          title: 'Kilometros',
          type: 'numeric',
          format: '{0:2}',
        },
        {
          key: 'montoTotal',
          title: 'Monto Total',
          type: 'numeric',
          format: '{0:2}',
        },
        {
          key: 'fechaPartida',
          title: 'Fecha de Partida',
          type: 'date',
          format: 'ddMMyyyy',
        },
        {
          key: 'fechaDescarga',
          title: 'Fecha de Descarga',
          type: 'date',
          format: 'ddMMyyyy',
        },
        { key: 'userName', title: 'Nombre de Usuario', type: 'text' },
        {
          key: 'userDateTime',
          title: 'Fecha de Usuario',
          type: 'date',
          format: 'ddMMyyyy hh:MM:ss',
        },
      ],
      menuActions: [
        {
          key: 'edit',
          label: 'Editar',
          icon: 'edit',
          onClick: (row) => this.editar(row),
        },
      ],
      toolBarActions: [
        {
          key: 'new',
          label: 'Nuevo Viaje',
          type: 'success',
          icon: 'local_shipping',
          onClick: () => this.nuevo(),
        },
      ],
    };
  }

  onBuscar() {
    this.dataService.filterSub$.next(this.form.value);
    this.dataService.search();
  }

  editar(row: GestionViajesGridModel) {
    console.log('Editar', row);
  }

  nuevo() {
    this.router.navigate(['./formulario'], { relativeTo: this.route });
  }
}
