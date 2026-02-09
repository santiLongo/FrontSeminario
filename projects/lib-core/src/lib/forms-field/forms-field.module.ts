import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldComponent } from './form-field/form-field';
import { NumberFormFieldComponent } from './number-form/number-form-field';
import { DateFormFieldComponent } from './date-picker/date-form-field';
import { TextareaFormFieldComponent } from './textarea/textarea-form-field';
import { ComboComponent } from './combo/combo';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { IMaskModule } from 'angular-imask';
import { ViajeMaskComponent } from './viaje-mask/viaje-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    IMaskModule
  ],
  declarations: [FormFieldComponent, NumberFormFieldComponent, DateFormFieldComponent, TextareaFormFieldComponent, ComboComponent, ViajeMaskComponent],
  exports: [FormFieldComponent, NumberFormFieldComponent, DateFormFieldComponent, TextareaFormFieldComponent, ComboComponent, ViajeMaskComponent],
})
export class InputFormsModule {}
