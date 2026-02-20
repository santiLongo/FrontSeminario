import { Component, OnInit } from '@angular/core';
import {
  GridComponent,
  CoreViewComponent,
  FilterComponent,
  GridConfig,
  DialogService,
  AlertService,
} from 'lib-core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChoferesDataService } from '../services/data.service';
import { ChoferesGridModel } from '../models/choferes-grid-model';
import { UpsertChoferDialogComponent } from '../dialogs/upsert/upsert-dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.html',
  imports: [
    GridComponent,
    CoreViewComponent,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  providers: [ChoferesDataService],
})
export class ChoferesComponent implements OnInit {
  gridConfig: GridConfig<ChoferesGridModel>;

  constructor(
    public dataService: ChoferesDataService,
    private dialog: DialogService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.gridSetup();
    //
    this.dataService.search();
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        {
          key: 'id',
          title: 'ID',
          type: 'text',
          hidden: true,
        },
        {
          key: 'nombre',
          title: 'Nombre',
          type: 'text',
          filter: true,
        },
        {
          key: 'apellido',
          title: 'Apellido',
          type: 'text',
          filter: true,
        },
        {
          key: 'dni',
          title: 'DNI',
          type: 'numeric',
        },
        {
          key: 'nroRegistro',
          title: 'Nro. Registro',
          type: 'text',
        },
        {
          key: 'ultimoViaje',
          title: 'Último Viaje',
          type: 'date',
          format: 'ddMMyyyy',
        },
        {
          key: 'telefono',
          title: 'Teléfono',
          type: 'text',
        },
        {
          key: 'direccion',
          title: 'Dirección',
          type: 'text',
        },
        {
          key: 'fechaAlta',
          title: 'Fecha Alta',
          type: 'date',
          format: 'ddMMyyyy',
        },
        {
          key: 'fechaBaja',
          title: 'Fecha Baja',
          type: 'date',
          format: 'ddMMyyyy',
        },
      ],
      selectableSettings: {
        selectable: true,
        type: 'single',
      },
      toolBarActions: [
        {
          key: 'add',
          label: 'Nuevo Chofer',
          type: 'success',
          onClick: () => {
            this.openUpsert();
          },
        },
        {
          key: 'edit',
          label: 'Editar Chofer',
          type: 'primary',
          disabledOnEmptyRows: true,
          onClick: (rows) => {
            this.openUpsert(rows[0].id);
          },
        },
      ],
      menuActions: [
        {
          key: 'delete',
          label: 'Dar de Baja',
          hidden: (row) => row.fechaBaja != null,
          onClick: (row) => {
            this.darBaja(row.id);
          },
        },
        {
          key: 'alta',
          label: 'Dar de Alta ',
          hidden: (row) => row.fechaBaja == null,
          onClick: (row) => {
            this.darAlta(row.id);
          },
        },
      ],
    };
  }

  openUpsert(id?: number) {
    this.dialog
      .open(UpsertChoferDialogComponent, { data: { id }, size: 'l' })
      .afterClosed()
      .subscribe(() => {
        this.dataService.search();
      });
  }

  darBaja(id: number) {
    this.dataService
      .baja(id)
      .pipe(
        switchMap(() => {
          return this.alertService.success$('Chofer dado de baja con exito');
        }),
      )
      .subscribe(() => this.dataService.search());
  }

  darAlta(id: number) {
    this.dataService
      .alta(id)
      .pipe(
        switchMap(() => {
          return this.alertService.success$('Chofer dado de alta con exito');
        }),
      )
      .subscribe(() => this.dataService.search());
  }
}
