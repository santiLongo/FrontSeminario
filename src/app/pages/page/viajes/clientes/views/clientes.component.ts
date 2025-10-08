import { Component, OnInit } from "@angular/core";
import { BasicFormComponent, BasicFormConfig } from "../../../../../components/basic-form/basic-form.component";
import { CardViewComponent } from "../../../../../components/card-view/card-view.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-clientes-router',
    templateUrl: './clientes.component.html',
    imports: [CardViewComponent, BasicFormComponent],
})
export class ClientesComponent implements OnInit { 
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
            formControlName: 'fecha',
            label: 'Fecha',
            row: 1,
            col: 'col-4',
            type: 'date',
        }
    ]
    public formulario: FormGroup = new FormGroup({
        razonSocial: new FormControl(''),
        cuit: new FormControl(''),
    })
    
    ngOnInit() {
        
    }
}