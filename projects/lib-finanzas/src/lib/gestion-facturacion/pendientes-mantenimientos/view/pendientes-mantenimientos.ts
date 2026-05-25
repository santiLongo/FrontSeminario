import { Component, OnInit } from '@angular/core';
import { CoreViewComponent, DialogService, GridComponent, GridConfig } from 'lib-core';
import { CommonModule } from '@angular/common';
import { PendientesMantenimientosHttpService } from '../services/http.service';
import { PendientesMantenimientosDataService } from '../services/data.service';
import { MantenimientoPendienteGridModel } from '../models/grid-model';
import { GenerarFacturaMantenimientoDialogComponent } from '../dialog/generar/generar-dialog';

@Component({
    selector: 'app-pendientes-mantenimientos',
    templateUrl: './pendientes-mantenimientos.html',
    imports: [GridComponent, CoreViewComponent, CommonModule],
    providers: [PendientesMantenimientosDataService],
})
export class PendientesMantenimientosComponent implements OnInit {
    gridConfig: GridConfig<MantenimientoPendienteGridModel>;

    constructor(
        public dataService: PendientesMantenimientosDataService,
        private httpService: PendientesMantenimientosHttpService,
        private dialog: DialogService,
    ) {}

    ngOnInit(): void {
        this.gridSetup();
        this.load();
    }

    load() {
        this.httpService.getAll().subscribe((data) => this.dataService.setAll(data));
    }

    gridSetup() {
        this.gridConfig = {
            columns: [
                { key: 'idMantenimiento', title: 'Id', type: 'numeric', hidden: true },
                { key: 'titulo', title: 'Título', type: 'text' },
                { key: 'patenteCamion', title: 'Camión', type: 'text' },
                { key: 'nombreTaller', title: 'Taller', type: 'text' },
                { key: 'fechaEntrada', title: 'Entrada', type: 'date', format: 'ddMMyyyy' },
                { key: 'fechaSalida', title: 'Salida', type: 'date', format: 'ddMMyyyy' },
                { key: 'importe', title: 'Importe', type: 'numeric' },
            ],
            toolBarActions: [
                {
                    key: 'generar',
                    label: 'Generar Factura',
                    disabledOnEmptyRows: true,
                    type: 'success',
                    position: 'right',
                    onClick: (rows) => this.openGenerar(rows[0]),
                },
            ],
        };
    }

    openGenerar(row: MantenimientoPendienteGridModel) {
        this.dialog
            .open(GenerarFacturaMantenimientoDialogComponent, {
                data: { idMantenimiento: row.idMantenimiento, titulo: row.titulo },
                size: 'xxl',
            })
            .afterClosed()
            .subscribe((result) => { if (result) this.load(); });
    }
}
