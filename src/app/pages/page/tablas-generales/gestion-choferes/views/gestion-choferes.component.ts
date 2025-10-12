import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CardViewComponent } from "../../../../../components/card-view/card-view.component";
import { BasicFilterComponent } from "../../../../../components/basic-filter/basic-filter.component";
import { BasicGridComponent, BasicGridConfig } from "../../../../../components/basic-grid/basic-grid.component";
import { BasicFormConfig } from "../../../../../components/basic-form/basic-form.component";
import { FormControl, FormGroup } from "@angular/forms";
import { GestionChoferesDataService } from "../services/gestion-choferes-data.service";

@Component({
  selector: "app-gestion-choferes",
  templateUrl: "./gestion-choferes.component.html",
  imports: [CardViewComponent, BasicFilterComponent, BasicGridComponent],
  providers: [GestionChoferesDataService],
})
export class GestionChoferesComponent implements OnInit {
    public config: BasicFormConfig[] = []
    public gridConfig: BasicGridConfig[] = []
    public formulario!: FormGroup;
    
    constructor(public dataService: GestionChoferesDataService) {}

    ngOnInit(): void {
        this.config = [
            {
                formControlName: 'nombre',
                label: 'Nombre',
                row: 1,
                col: 'col-6',
                type: 'text',
            },
            {
                formControlName: 'apellido',
                label: 'Apellido',
                row: 1,
                col: 'col-6',
                type: 'text',
            },
            {
                formControlName: 'fechaAltaDesde',
                label: 'Fecha Alta Desde',
                row: 2,
                col: 'col-6',
                type: 'date',
            },
            {
                formControlName: 'fechaAltaHasta',
                label: 'Fecha Alta Hasta',
                row: 2,
                col: 'col-6',
                type: 'date',
            },
            {
                formControlName: 'fechaBajaDesde',
                label: 'Fecha Baja Desde',
                row: 3,
                col: 'col-6',
                type: 'date',
            },
            {
                formControlName: 'fechaBajaHasta',
                label: 'Fecha Baja Hasta',
                row: 3,
                col: 'col-6',
                type: 'date',
            },
        ];

        this.gridConfig = [
            {
                columnName: 'nombre',
                label: 'Nombre',
                type: 'text',
            },
            {
                columnName: 'apellido',
                label: 'Apellido',
                type: 'text',
            },
            {
                columnName: 'telefono',
                label: 'Telefono',
                type: 'number',
            },
            {
                columnName: 'direccion',
                label: 'Direccion',
                type: 'text',
            },
            {
                columnName: 'mail',
                label: 'Mail',
                type: 'text',
            },
            {
                columnName: 'nroRegistro',
                label: 'Nro Registro',
                type: 'text',
            },
            {
                columnName: 'fechaAlta',
                label: 'Fecha Alta',
                type: 'date',
            },
            {
                columnName: 'fechaBaja',
                label: 'Fecha Baja',
                type: 'date',
            },
        ];
        this.formulario = new FormGroup({
            nombre: new FormControl(''),
            apellido: new FormControl(''),
            fechaAltaDesde: new FormControl(''),
            fechaAltaHasta: new FormControl(''),
            fechaBajaDesde: new FormControl(''),
            fechaBajaHasta: new FormControl(''),
        });
    }

    onSearch(){
        this.dataService.filterSub$.next(this.formulario.value);
        this.dataService.search();
    }
}