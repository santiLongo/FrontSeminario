import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CoreViewComponent, DialogService, GridComponent, GridConfig } from 'lib-core';
import { CommonModule } from '@angular/common';
import { PendientesViajesHttpService } from '../services/http.service';
import { PendientesViajesDataService } from '../services/data.service';
import { ViajesPendienteGridModel } from '../models/grid-model';
import { GenerarFacturaViajeDialogComponent } from '../dialog/generar/generar-dialog';

@Component({
    selector: 'app-pendientes-viajes',
    templateUrl: './pendientes-viajes.html',
    imports: [GridComponent, CoreViewComponent, CommonModule],
    providers: [PendientesViajesDataService],
})
export class PendientesViajesComponent implements OnInit, AfterViewInit {
    gridConfig: GridConfig<ViajesPendienteGridModel>;

    constructor(
        public dataService: PendientesViajesDataService,
        private httpService: PendientesViajesHttpService,
        private dialog: DialogService,
    ) {}

    ngOnInit(): void {
        this.gridSetup();   
    }

    ngAfterViewInit(): void {
        this.load();
    }

    load() {
        this.httpService.getAll().subscribe((data) => this.dataService.setAll(data));
    }

    gridSetup() {
        this.gridConfig = {
            columns: [
                { key: 'idViaje', title: 'Id', type: 'numeric', hidden: true },
                { key: 'nroViaje', title: 'Nro. Viaje', type: 'text' },
                { key: 'razonSocialCliente', title: 'Cliente', type: 'text' },
                { key: 'nombreChofer', title: 'Chofer', type: 'text' },
                { key: 'patenteCamion', title: 'Camión', type: 'text' },
                { key: 'fechaPartida', title: 'Salida', type: 'date', format: 'ddMMyyyy' },
                { key: 'fechaDescarga', title: 'Descarga', type: 'date', format: 'ddMMyyyy' },
                { key: 'montoTotal', title: 'Monto', type: 'numeric' },
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

    openGenerar(row: ViajesPendienteGridModel) {
        this.dialog
            .open(GenerarFacturaViajeDialogComponent, {
                data: { idViaje: row.idViaje, nroViaje: row.nroViaje },
                size: 'xxl',
            })
            .afterClosed()
            .subscribe((result) => { if (result) this.load(); });
    }
}
