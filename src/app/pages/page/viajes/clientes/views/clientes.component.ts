import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { BasicFormComponent, BasicFormConfig } from "../../../../../components/basic-form/basic-form.component";
import { CardViewComponent } from "../../../../../components/card-view/card-view.component";
import { FormControl, FormGroup } from "@angular/forms";
import { BasicFilterComponent } from "../../../../../components/basic-filter/basic-filter.component";
import { BasicGridComponent, BasicGridConfig } from "../../../../../components/basic-grid/basic-grid.component";
import { ClientesDataService } from "../services/clientes-data.service";
import { ClientesFilterModel } from "../models/clientes-filter.model";
import { ClientesGridModel } from "../models/clientes-grid.model";

@Component({
    selector: 'app-clientes-router',
    templateUrl: './clientes.component.html',
    imports: [CardViewComponent, BasicFilterComponent, BasicGridComponent],
    providers: [ClientesDataService]
})
export class ClientesComponent implements AfterViewInit { 
    public config: BasicFormConfig[] = [
        {
            formControlName: 'razonSocial',
            label: 'Razon Social',
            row: 1,
            col: 'col-4',
            type: 'text',
        },
        {
            formControlName: 'cuit',
            label: 'Cuit',
            row: 1,
            col: 'col-4',
            type: 'text',
        },
        {
            formControlName: 'soyCheckbox',
            label: 'Soy un checkbox',
            row: 1,
            col: 'col-4',
            type: 'checkbox',
        }
    ]

    public gridConfig: BasicGridConfig[] = [
        {
            columnName: 'razonSocial', 
            label: 'Razon Social',
            type: 'text',
        },
        {
            columnName: 'cuit', 
            label: 'Cuit',
            type: 'text',
        },
    ]
    public formulario: FormGroup = new FormGroup({
        razonSocial: new FormControl(''),
        cuit: new FormControl(''),
        soyCheckbox: new FormControl(false),
    })
    
    constructor(public dataService: ClientesDataService) {}

    ngAfterViewInit(): void {
        this.formulario.valueChanges.subscribe((val) => {
            console.log(val);
        });
    }

    onSearch(){
        this.dataService.filterSub$.next(this.formulario.value);
        this.dataService.search();
    }
}