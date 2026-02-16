import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IMaskModule } from 'angular-imask';

@Component({
  standalone: true,
  selector: 'app-number-form-field',
  templateUrl: './number-form-field.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFormFieldComponent),
      multi: true,
    },
  ],
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
    IMaskModule,
  ]
})
export class NumberFormFieldComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;
  @Input() readonly = false;

  @ViewChild('input', { static: true })
  inputRef!: ElementRef<HTMLInputElement>;

  value: number | null = null;
  displayValue = '';
  disabled = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: number | null): void {
    this.value = value;
    this.displayValue = value !== null ? this.format(value) : '';
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

  onInput(raw: string): void {
   const digits = raw.replace(/\D/g, '');

    if (!digits) {
      this.value = null;
      this.displayValue = '';
      this.onChange(null);
      return;
    }

    const parsed = Number(digits);
    this.value = parsed;
    this.displayValue = this.format(parsed);
    this.onChange(parsed);

    queueMicrotask(() => {
      this.inputRef.nativeElement.value = this.displayValue;
    });
  }

  onBlur(): void {
    this.onTouched();
  }

  clear(): void {
    this.value = null;
    this.displayValue = '';
    this.onChange(null);
    this.onTouched();
    queueMicrotask(() => this.inputRef?.nativeElement.focus());
  }

  private format(val: number): string {
    return val.toLocaleString('es-AR');
  }
}
