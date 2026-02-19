import { Component, OnInit } from "@angular/core";
import { GridComponent, CoreViewComponent, FilterComponent, GridConfig } from "lib-core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ChoferesDataService } from "../services/data.service";
import { ChoferesGridModel } from "../models/choferes-grid-model";

@Component({
    selector: 'app-choferes',
    templateUrl: './choferes.html',
    imports: [GridComponent, CoreViewComponent, ReactiveFormsModule, MatButtonToggleModule],
    providers: [ChoferesDataService],
})
export class ChoferesComponent implements OnInit { 
    gridConfig: GridConfig<ChoferesGridModel>; 

    constructor(public dataService: ChoferesDataService) {
    }

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
                    filter: true
                },
                {
                    key: 'apellido',
                    title: 'Apellido',
                    type: 'text',
                    filter: true
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
                    format: 'ddMMyyyy'
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
                    format: 'ddMMyyyy'
                },
                {
                    key: 'fechaBaja',
                    title: 'Fecha Baja',
                    type: 'date',
                    format: 'ddMMyyyy'
                }
            ],
            selectableSettings: {
                selectable: true,
                type: 'single'
            },
            toolBarActions: [
                {
                    key: 'add',
                    label: 'Nuevo Chofer',
                    type: 'success',
                    onClick: () => {
                        console.log('Agregar');
                    }
                },
                {
                    key: 'edit',
                    label: 'Editar Chofer',
                    type: 'primary',
                    onClick: () => {
                        console.log('Editar');
                    }
                }
            ],
            menuActions: [
                {
                    key: 'delete',
                    label: 'Eliminar Chofer',
                    hidden: (row) => row.fechaBaja != null,
                    onClick: () => {
                        console.log('Eliminar');
                    }
                },
                {
                    key: 'alta',
                    label: 'Dar de Alta Chofer',
                    hidden: (row) => row.fechaBaja == null,
                    onClick: () => {
                        console.log('Dar de Alta');
                    }
                }
            ]
        };
    }
}