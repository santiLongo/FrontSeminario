import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  AlertService,
  CoreViewComponent,
  DialogService,
  GridComponent,
  GridConfig,
} from 'lib-core';
import { CommonModule } from '@angular/common';
import { filter, switchMap } from 'rxjs';
import { PendientesConfirmarDataService } from '../services/data.service';
import { PendienteConfirmarGridModel } from '../models/grid-model';
import { ConfirmarPendienteDialogComponent } from '../dialog/confirmar/confirmar-dialog';
import { EditarEmitidaDialogComponent } from '../dialog/editar-emitida/editar-emitida-dialog';
import { EditarRecibidaDialogComponent } from '../dialog/editar-recibida/editar-recibida-dialog';
import { FinanzasDialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-pendientes-confirmar',
  templateUrl: './pendientes-confirmar.html',
  imports: [GridComponent, CoreViewComponent, CommonModule],
  providers: [PendientesConfirmarDataService],
})
export class PendientesConfirmarComponent implements OnInit {
  @ViewChild('tipoTpl', { static: true }) tipoTpl: TemplateRef<any>;
  @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;

  gridConfig: GridConfig<PendienteConfirmarGridModel>;

  constructor(
    public dataService: PendientesConfirmarDataService,
    private dialog: DialogService,
    private alertService: AlertService,
    private dialogService: FinanzasDialogService
  ) {}

  ngOnInit(): void {
    this.gridSetup();
    this.dataService.search();
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        { key: 'idFactura', title: 'Id', type: 'numeric', hidden: true },
        {
          key: 'tipo',
          title: 'Tipo',
          type: 'template',
          template: this.tipoTpl,
        },
        { key: 'puntoVenta', title: 'Pto. Venta', type: 'numeric' },
        { key: 'numero', title: 'Número', type: 'numeric' },
        {
          key: 'fechaEmision',
          title: 'Fecha Emisión',
          type: 'date',
          format: 'ddMMyyyy',
        },
        {
          key: 'fechaVencimiento',
          title: 'Vencimiento',
          type: 'date',
          format: 'ddMMyyyy',
        },
        { key: 'nombreContraparte', title: 'Contraparte', type: 'text' },
        { key: 'total', title: 'Total', type: 'numeric' },
        {
          key: 'estado',
          title: 'Estado',
          type: 'template',
          template: this.estadoTpl,
        },
      ],
      menuActions: [
        {
          key: 'ver',
          label: 'Ver',
          icon: 'search',
          onClick: (row) => this.ver(row),
        },
        {
          key: 'anular',
          label: 'Borrar',
          icon: 'remove',
          onClick: (row) => this.delete(row),
        },
      ],
      toolBarActions: [
        {
          key: 'editar',
          label: 'Editar',
          icon: 'edit',
          position: 'right',
          type: 'primary',
          onClick: (rows) => this.openEditar(rows[0]),
        },
        {
          key: 'confirmar',
          label: 'Confirmar',
          icon: 'next',
          position: 'right',
          type: 'success',
          onClick: (rows) => this.openConfirmar(rows[0]),
        },
      ],
    };
  }

  openConfirmar(row: PendienteConfirmarGridModel) {
    this.dialog
      .open(ConfirmarPendienteDialogComponent, {
        data: { idFactura: row.idFactura, numero: row.numero, tipo: row.tipo },
        size: 'xxl',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.dataService.search();
      });
  }

  openEditar(row: PendienteConfirmarGridModel) {
    if (row.tipo === 1) {
      this.dialog
        .open(EditarEmitidaDialogComponent, {
          data: { idFactura: row.idFactura, numero: row.numero },
          size: 'xxl',
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) this.dataService.search();
        });
    } else {
      this.dialog
        .open(EditarRecibidaDialogComponent, {
          data: { idFactura: row.idFactura, numero: row.numero },
          size: 'xxl',
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) this.dataService.search();
        });
    }
  }

  delete(row: PendienteConfirmarGridModel) {
    const tipoLabel = row.tipo === 1 ? 'emitida' : 'recibida';
    this.alertService
      .info$(
        `¿Seguro que desea borrar la factura ${tipoLabel} #${row.puntoVenta}-${row.numero}?`,
      )
      .pipe(
        filter(Boolean),
        switchMap(() => this.dataService.delete(row.idFactura, row.tipo)),
        switchMap(() =>
          this.alertService.success$('Éxito', 'Factura borrada correctamente'),
        ),
      )
      .subscribe(() => this.dataService.search());
  }

  ver(row: PendienteConfirmarGridModel): void {
    if(row.tipo === 1){
      this.dialogService.openDetalleEmitida(row.idFactura, false).subscribe()
    } else {
      this.dialogService.openDetalleRecibida(row.idFactura, false).subscribe()
    }
  }
}
