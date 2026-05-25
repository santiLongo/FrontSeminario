import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertService, CoreViewComponent, DialogService, GridComponent, GridConfig } from 'lib-core';
import { CommonModule } from '@angular/common';
import { filter, switchMap } from 'rxjs';
import { FacturasEmitidasDataService } from '../services/data.service';
import { FacturaEmitidaGridModel } from '../models/grid-model';
import { CrearEmitidaConViajeDialogComponent } from '../dialog/crear-con-viaje/crear-con-viaje-dialog';
import { CrearEmitidaSinViajeDialogComponent } from '../dialog/crear-sin-viaje/crear-sin-viaje-dialog';
import { ConfirmarEmitidaDialogComponent } from '../dialog/confirmar/confirmar-dialog';
import { DetalleEmitidaDialogComponent } from '../dialog/detalle/detalle-dialog';

@Component({
    selector: 'app-facturas-emitidas',
    templateUrl: './facturas-emitidas.html',
    imports: [GridComponent, CoreViewComponent, CommonModule],
    providers: [FacturasEmitidasDataService],
})
export class FacturasEmitidasComponent implements OnInit {
    @ViewChild('estadoTpl', { static: true }) estadoTpl: TemplateRef<any>;
    @ViewChild('confirmadaTpl', { static: true }) confirmadaTpl: TemplateRef<any>;

    gridConfig: GridConfig<FacturaEmitidaGridModel>;

    constructor(
        public dataService: FacturasEmitidasDataService,
        private dialog: DialogService,
        private alertService: AlertService,
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
                { key: 'nombreContraparte', title: 'Cliente', type: 'text' },
                { key: 'total', title: 'Total', type: 'numeric' },
                { key: 'saldoPendiente', title: 'Saldo', type: 'numeric' },
                { key: 'estado', title: 'Estado', type: 'template', template: this.estadoTpl },
                { key: 'confirmada', title: 'Confirmada', type: 'template', template: this.confirmadaTpl },
                { key: 'cae', title: 'CAE', type: 'text' },
            ],
            menuActions: [
                {
                    key: 'verDetalle',
                    label: 'Ver Detalle',
                    icon: 'view',
                    onClick: (row) => this.openDetalle(row.idFactura),
                },
                {
                    key: 'confirmar',
                    label: 'Confirmar',
                    icon: 'next',
                    hidden: (row) => row.confirmada || row.anulada,
                    onClick: (row) => this.openConfirmar(row),
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
                    key: 'nuevaSinViaje',
                    label: 'Nueva Sin Viaje',
                    type: 'success',
                    position: 'right',
                    onClick: () => this.openCrearSinViaje(),
                },
                {
                    key: 'nuevaConViaje',
                    label: 'Nueva Con Viaje',
                    type: 'success',
                    position: 'right',
                    onClick: () => this.openCrearConViaje(),
                },
            ],
        };
    }

    openCrearConViaje() {
        this.dialog
            .open(CrearEmitidaConViajeDialogComponent, { size: 'xxl' })
            .afterClosed()
            .subscribe(() => this.dataService.search());
    }

    openCrearSinViaje() {
        this.dialog
            .open(CrearEmitidaSinViajeDialogComponent, { size: 'xl' })
            .afterClosed()
            .subscribe(() => this.dataService.search());
    }

    openDetalle(idFactura: number) {
        this.dialog
            .open(DetalleEmitidaDialogComponent, { data: { idFactura }, size: 'xxl' })
            .afterClosed()
            .subscribe(() => this.dataService.search());
    }

    openConfirmar(row: FacturaEmitidaGridModel) {
        this.dialog
            .open(ConfirmarEmitidaDialogComponent, { data: { idFactura: row.idFactura, numero: row.numero }, size: 'xxl' })
            .afterClosed()
            .subscribe(() => this.dataService.search());
    }

    anular(row: FacturaEmitidaGridModel) {
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
