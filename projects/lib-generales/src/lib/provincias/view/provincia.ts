import { Component } from '@angular/core';
import {
  CoreViewComponent,
  FilterComponent,
  GridComponent,
  ButtonComponent,
  DateFormFieldComponent,
  ComboComponent,
  ViajeMaskComponent,
} from 'lib-core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-provincia',
    templateUrl: './provincia.html',
    imports: [
        CoreViewComponent,
        ReactiveFormsModule,
        MatIconModule,
        FilterComponent,
        GridComponent,
        ButtonComponent,
        DateFormFieldComponent,
        ComboComponent,
        ViajeMaskComponent,
  ],
})
export class ProvinciaComponent{
    formulario: FormGroup;

    constructor(private fb: FormBuilder) {
        
    }
}