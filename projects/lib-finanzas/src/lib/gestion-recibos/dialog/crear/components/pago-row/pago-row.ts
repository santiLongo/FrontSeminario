import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    ComboComponent,
    CuitMaskComponent,
    DateFormFieldComponent,
    DecimalFormFieldComponent,
} from 'lib-core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-recibo-pago-row',
    templateUrl: './pago-row.html',
    imports: [
        ReactiveFormsModule,
        ComboComponent,
        DecimalFormFieldComponent,
        DateFormFieldComponent,
        CuitMaskComponent,
        MatCheckboxModule,
        CommonModule,
    ],
})
export class ReciboPagoRowComponent {
    @Input({ required: true }) grupo!: FormGroup;

    get esCheque(): boolean {
        return this.grupo.get('idFormaPago')?.value === 1;
    }

    get datosCheque(): FormGroup {
        return this.grupo.get('datosCheque') as FormGroup;
    }
}
