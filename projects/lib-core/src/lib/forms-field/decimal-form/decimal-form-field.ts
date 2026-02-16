import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-decimal-form-field',
  templateUrl: './decimal-form-field.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DecimalFormFieldComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class DecimalFormFieldComponent implements ControlValueAccessor {
  @ViewChild('input', { static: true })
  inputRef!: ElementRef<HTMLInputElement>;

  @Input({ required: true }) label!: string;
  @Input() readonly = false;
  @Input() decimals = 2;

  value: number | null = null;
  display = '';
  disabled = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: number | null): void {
    this.value = value;
    this.display = value !== null ? this.format(value) : '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onInput(raw: string) {
    const cleaned = raw.replace(/[^\d.,]/g, '');
    const parts = cleaned.split(',');
    let integer = parts[0] ?? '';
    let decimal = parts[1] ?? '';

    integer = integer.replace(/\./g, '');
    decimal = decimal.slice(0, this.decimals);

    const numericString = decimal ? `${integer}.${decimal}` : integer;
    const parsed = Number(numericString);

    if (!isNaN(parsed)) {
      this.value = parsed;
      this.onChange(parsed);
    }

    // mostrar lo que el usuario tipeó, sin formatear
    this.display = cleaned;
  }

  onBlur() {
    this.onTouched();

    if (!this.display) {
      this.clear();
      return;
    }

    const parsed = this.parse(this.display);
    if (parsed === null) {
      this.clear();
      return;
    }

    this.value = parsed;
    this.display = this.format(parsed);
    this.onChange(parsed);
  }

  clear() {
    this.value = null;
    this.display = '';
    this.onChange(null);
    this.onTouched();
  }

  private parse(raw: string): number | null {
    const normalized = raw
      .replace(/\s/g, '')
      .replace(/\./g, '')
      .replace(',', '.');

    const n = Number(normalized);
    return isNaN(n) ? null : n;
  }

  private format(val: number): string {
    return val.toLocaleString('es-AR', {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals,
    });
  }
}
