import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-form-field',
  templateUrl: './date-form-field.component.html',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFormFieldComponent),
      multi: true,
    },
  ],
})
export class DateFormFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() required = false;
  @Input() readonly = false;

   value: Date | null = null;
  displayValue = '__-__-____';
  onChange = (value: Date | null) => {};
  onTouched = () => {};

  writeValue(value: Date | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // opcional
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.value = event.value ?? null;
    this.onChange(this.value);
  }

  onManualInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, ''); // solo números

    // limitamos a 8 dígitos
    if (digits.length > 8) digits = digits.slice(0, 8);

    // agregamos guiones automáticamente
    let formatted = '';
    if (digits.length > 4) {
      formatted =
        digits.slice(0, 2) + '-' + digits.slice(2, 4) + '-' + digits.slice(4);
    } else if (digits.length > 2) {
      formatted = digits.slice(0, 2) + '-' + digits.slice(2);
    } else {
      formatted = digits;
    }

    input.value = formatted;

    // actualizar el valor real en el FormControl
    if (formatted.length === 10) {
      const [day, month, year] = formatted.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        this.value = date;
        this.onChange(this.value);
      } else {
        this.value = null;
        this.onChange(null);
      }
    } else {
      this.value = null;
      this.onChange(null);
    }
  }

  // --- Formateo para mostrar en el input ---
  formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
}
