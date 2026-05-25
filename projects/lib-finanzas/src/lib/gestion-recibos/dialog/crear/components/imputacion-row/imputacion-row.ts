import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DecimalFormFieldComponent, NumberFormFieldComponent } from 'lib-core';

@Component({
    selector: 'app-recibo-imputacion-row',
    templateUrl: './imputacion-row.html',
    imports: [
        ReactiveFormsModule,
        NumberFormFieldComponent,
        DecimalFormFieldComponent,
    ],
})
export class ReciboImputacionRowComponent {
    @Input({ required: true }) grupo!: FormGroup;
}
