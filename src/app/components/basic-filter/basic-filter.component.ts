import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BasicFormComponent, BasicFormConfig } from "../basic-form/basic-form.component";
import { FormGroup, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
    selector: 'app-basic-filter',
    templateUrl: './basic-filter.component.html',
    imports: [
        BasicFormComponent,
        MatExpansionModule,
        MatButtonModule,
        FormsModule,
        MatIconModule
    ]
})
export class BasicFilterComponent { 
    @Input() public config: BasicFormConfig[] = [];
    @Input() public formulario = new FormGroup({});
    @Output() public onSearch = new EventEmitter<FormGroup>();

    public onSearchClieck() {
        this.onSearch.emit(this.formulario);
    }

    public onClear() {
        this.formulario.reset();
    }
    
}

