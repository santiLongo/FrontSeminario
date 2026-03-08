import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  GridComponent,
  CoreViewComponent,
  AlertService,
  DialogService,
  GridConfig,
} from 'lib-core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ClientesDataService } from '../services/data.service';
import { ClienteGridModel } from '../models/grid-model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { UpsertClienteDialogComponent } from '../dialog/upsert-dialog';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.html',
  imports: [
    GridComponent,
    CoreViewComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatExpansionModule,
    CommonModule,
  ],
  providers: [ClientesDataService],
})
export class ClientesComponent implements OnInit {
  @ViewChild('estado', { static: true }) estado: TemplateRef<any>;
  //
  gridConfig: GridConfig<ClienteGridModel>;

  constructor(
    public dataService: ClientesDataService,
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
          key: 'idCliente',
          title: 'Id',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'fechaBaja',
          title: 'Estado',
          type: 'template',
          template: this.estado,
        },
        {
          key: 'razonSocial',
          title: 'Razon Social',
          type: 'text',
        },
        {
          key: 'cuit',
          title: 'Cuit',
          type: 'numeric',
          format: 'cuit',
        },
        {
          key: 'direccion',
          title: 'Direccion',
          type: 'text',
        },
        {
          key: 'telefono',
          title: 'Telefono',
          type: 'text',
        },
        {
          key: 'email',
          title: 'Mail',
          type: 'text',
        },
        {
          key: 'fechaBaja',
          title: 'Fecha Baja',
          type: 'date',
          format: 'ddMMyyyy hh:MM:ss',
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
          format: 'ddMMyyyy hh:MM:ss',
        },
      ],
      menuActions: [
        {
            key: 'baja',
            label: 'Baja',
            icon: 'remove',
            hidden: (row) => row.fechaBaja !== null,
            onClick: (row) => this.bajaAlta(row.idCliente, `Se dio de baja correcatamente al cliente ${row.razonSocial}`)
        },
        {
            key: 'alta',
            label: 'Alta',
            icon: 'add',
            hidden: (row) => row.fechaBaja === null,
            onClick: (row) => this.bajaAlta(row.idCliente, `Se dio de alta correcatamente al cliente ${row.razonSocial}`)
        }
      ],
      toolBarActions: [
        {
          key: 'update',
          label: 'Modificar Cliente',
          disabledOnEmptyRows: true,
          type: 'primary',
          position: 'right',
          onClick: (row) => {
            this.openUpsert(row[0].idCliente)
          }
        },
        {
          key: 'new',
          label: 'Nuevo Cliente',
          type: 'success',
          position: 'right',
          onClick: () => {
            this.openUpsert()
          }
        },
      ],
    };
  }

  bajaAlta(idCliente: number, msg: string) {
    this.dataService
      .bajaAlta(idCliente)
      .pipe(
        switchMap(() => {
          return this.alertService.success$('Exito', msg);
        }),
      )
      .subscribe(() => this.dataService.search());
  }

  openUpsert(idCliente?: number) {
    this.dialog.open(UpsertClienteDialogComponent, {
      data: { idCliente },
      size: 'xl'
    }).afterClosed()
    .subscribe(() => this.dataService.search());
  }
}
