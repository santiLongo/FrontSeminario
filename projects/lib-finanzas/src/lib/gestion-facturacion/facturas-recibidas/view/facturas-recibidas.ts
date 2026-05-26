import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertService, CoreViewComponent, DialogService, GridComponent, GridConfig } from 'lib-core';
import { CommonModule } from '@angular/common';
import { filter, switchMap } from 'rxjs';
import { FacturasRecibidasDataService } from '../services/data.service';
import { FacturaRecibidaGridModel } from '../models/grid-model';
import { CrearRecibidaDialogComponent } from '../dialog/crear/crear-dialog';
import { FinanzasDialogService } from '../../../shared/services/dialog.service';

@Component({
    selector: 'app-facturas-recibidas',
    templateUrl: './facturas-recibidas.html',
    imports: [GridComponent, CoreViewComponent, CommonModule],
    providers: [FacturasRecibidasDataService],
})
export class FacturasRecibidasComponent implements OnInit {
    @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;

    gridConfig: GridConfig<FacturaRecibidaGridModel>;

    constructor(
        public dataService: FacturasRecibidasDataService,
        private dialog: DialogService,
        private alertService: AlertService,
        private finanzasDialogService: FinanzasDialogService
    ) {}

    ngOnInit(): void {
        this.gridSetup();
        this.dataService.search();
    }

    gridSetup() {
        this.gridConfig = {
            columns: [
                { key: 'idFactura', title: 'Id', type: 'numeric', hidden: true },
                { key: 'puntoVenta', title: 'Pto. Venta', type: 'numeric' },
                { key: 'numero', title: 'Número', type: 'numeric' },
                { key: 'fechaEmision', title: 'Fecha Emisión', type: 'date', format: 'ddMMyyyy' },
                { key: 'fechaVencimiento', title: 'Vencimiento', type: 'date', format: 'ddMMyyyy' },
                { key: 'nombreContraparte', title: 'Proveedor / Taller', type: 'text' },
                { key: 'total', title: 'Total', type: 'numeric' },
                { key: 'saldoPendiente', title: 'Saldo', type: 'numeric' },
                { key: 'estado', title: 'Estado', type: 'template', template: this.estadoTpl },
            ],
            menuActions: [
                {
                    key: 'verDetalle',
                    label: 'Ver Detalle',
                    icon: 'search',
                    onClick: (row) => this.openDetalle(row.idFactura),
                },
                {
                    key: 'anular',
                    label: 'Anular',
                    icon: 'remove',
                    hidden: (row) => row.anulada,
                    onClick: (row) => this.anular(row),
                },
            ],
            toolBarActions: [
                {
                    key: 'verDetalle',
                    label: 'Ver Factura',
                    disabledOnEmptyRows: true,
                    type: 'primary',
                    position: 'right',
                    onClick: (row) => this.openDetalle(row[0].idFactura),
                },
                {
                    key: 'nueva',
                    label: 'Nueva Factura',
                    type: 'success',
                    position: 'right',
                    onClick: () => this.openCrear(),
                },
            ],
        };
    }

    openCrear() {
        this.dialog
            .open(CrearRecibidaDialogComponent, { size: 'xl' })
            .afterClosed()
            .subscribe(() => this.dataService.search());
    }

    openDetalle(idFactura: number) {
        this.finanzasDialogService.openDetalleRecibida(idFactura)
            .subscribe(() => this.dataService.search());
    }

    anular(row: FacturaRecibidaGridModel) {
        this.alertService
            .info$(`¿Seguro que desea anular la factura #${row.puntoVenta}-${row.numero}?`)
            .pipe(
                filter(Boolean),
                switchMap(() => this.dataService.anular(row.idFactura)),
                switchMap(() => this.alertService.success$('Éxito', 'Factura anulada correctamente')),
            )
            .subscribe(() => this.dataService.search());
    }
}
