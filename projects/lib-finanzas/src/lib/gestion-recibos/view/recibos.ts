import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
    GridComponent,
    CoreViewComponent,
    AlertService,
    DialogService,
    GridConfig,
} from 'lib-core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RecibosDataService } from '../services/data.service';
import { ReciboGridModel } from '../models/grid-model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter, switchMap } from 'rxjs';
import { CrearReciboDialogComponent } from '../dialog/crear/crear-recibo-dialog';
import { DetalleReciboDialogComponent } from '../dialog/detalle/detalle-recibo-dialog';

@Component({
    selector: 'app-recibos',
    templateUrl: './recibos.html',
    imports: [
        GridComponent,
        CoreViewComponent,
        MatButtonToggleModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    providers: [RecibosDataService],
})
export class RecibosComponent implements OnInit {
    @ViewChild('tipo', { static: true }) tipo: TemplateRef<any>;
    @ViewChild('estado', { static: true }) estado: TemplateRef<any>;

    gridConfig: GridConfig<ReciboGridModel>;

    constructor(
        public dataService: RecibosDataService,
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
                { key: 'idRecibo', title: 'Id', type: 'numeric', hidden: true },
                { key: 'tipo', title: 'Tipo', type: 'template', template: this.tipo },
                { key: 'fechaRecibo', title: 'Fecha', type: 'date', format: 'ddMMyyyy' },
                { key: 'nombreContraparte', title: 'Contraparte', type: 'text' },
                { key: 'montoTotal', title: 'Monto Total', type: 'numeric' },
                { key: 'cantFacturasImputadas', title: 'Facturas', type: 'numeric' },
                { key: 'anulado', title: 'Estado', type: 'template', template: this.estado },
            ],
            menuActions: [
                {
                    key: 'verDetalle',
                    label: 'Ver Detalle',
                    icon: 'filter',
                    onClick: (row) => this.openDetalle(row.idRecibo),
                },
                {
                    key: 'anular',
                    label: 'Anular',
                    icon: 'remove',
                    hidden: (row) => row.anulado,
                    onClick: (row) => this.anular(row),
                },
            ],
            toolBarActions: [
                {
                    key: 'verDetalle',
                    label: 'Ver Recibo',
                    disabledOnEmptyRows: true,
                    type: 'primary',
                    position: 'right',
                    onClick: (row) => this.openDetalle(row[0].idRecibo),
                },
                {
                    key: 'new',
                    label: 'Nuevo Recibo',
                    type: 'success',
                    position: 'right',
                    onClick: () => this.openCrear(),
                },
            ],
        };
    }

    anular(row: ReciboGridModel) {
        this.alertService
            .info$(`¿Seguro que desea anular el recibo #${row.idRecibo}?`)
            .pipe(
                filter(Boolean),
                switchMap(() => this.dataService.anular(row.idRecibo)),
                switchMap(() => this.alertService.success$('Éxito', 'Recibo anulado correctamente')),
            )
            .subscribe(() => this.dataService.search());
    }

    openCrear() {
        this.dialog
            .open(CrearReciboDialogComponent, { size: 'xl' })
            .afterClosed()
            .subscribe(() => this.dataService.search());
    }

    openDetalle(idRecibo: number) {
        this.dialog
            .open(DetalleReciboDialogComponent, { data: { idRecibo }, size: 'xl' })
            .afterClosed()
            .subscribe(() => this.dataService.search());
    }
}
