import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';

@Component({
  standalone: false,
  selector: 'app-date-form-field',
  templateUrl: './date-form-field.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFormFieldComponent),
      multi: true,
    },
  ],
})
export class DateFormFieldComponent implements ControlValueAccessor {
  @ViewChild(MatDatepickerInput) datepickerInput!: MatDatepickerInput<Date>;

  @Input({ required: true }) label!: string;
  @Input() readonly = false;

  value: Date | null = null;
  disabled = false;

  onChange = (_: Date | null) => {};
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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange(date: Date | null): void {
    this.value = date;
    this.onChange(date);
  }

  clear(): void {
    this.value = null;
  this.datepickerInput.value = null;
  this.onChange(null);
  this.onTouched();
  }
}