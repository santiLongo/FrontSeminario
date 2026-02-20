import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  ReactiveFormsModule,
  NgControl,
  FormControl,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-decimal-form-field',
  templateUrl: './decimal-form-field.html',
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => DecimalFormFieldComponent),
  //     multi: true,
  //   },
  // ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
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

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

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
    const normalized = raw
      .replace(/\s/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/[^\d.]/g, '')
      .replace(/[^\d.-]/g, '');

    const parts = normalized.split('.');
    let integer = parts[0] ?? '';
    let decimal = parts[1] ?? '';

    decimal = decimal.slice(0, this.decimals);

    const numericString = decimal ? `${integer}.${decimal}` : integer;
    const parsed = Number(numericString);

    if (!isNaN(parsed)) {
      this.value = parsed;
      this.onChange(parsed);

      // 👇 ACÁ está la magia
      this.display = this.formatPartial(integer, decimal);
    } else {
      this.display = raw;
    }
  }

  onBlur() {
    this.onTouched();

    if (this.value === null) {
      this.clear();
      return;
    }

    this.display = this.format(this.value);
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

  private formatPartial(integer: string, decimal: string): string {
    if (!integer) return '';

    const intNumber = Number(integer);

    const formattedInt = intNumber.toLocaleString('es-AR');

    return decimal ? `${formattedInt},${decimal}` : formattedInt;
  }

  get control() {
    return this.ngControl?.control as FormControl;
  }

  get showError(): boolean {
    return !!this.control && this.control.invalid && this.control.touched;
  }

  get errorMessage(): string | null {
    const errors = this.control?.errors;
    if (!errors) return null;

    if (errors['required']) return `${this.label} es obligatorio`;
    if (errors['email']) return `Formato inválido`;
    if (errors['maxlength'])
      return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['minlength'])
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['max'])
      return `Máximo ${errors['maxlength'].requiredLength} numeros`;
    if (errors['min'])
      return `Mínimo ${errors['minlength'].requiredLength} numeros`;

    return 'Valor inválido';
  }
}
