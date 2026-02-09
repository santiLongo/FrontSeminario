import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-number-form-field',
  templateUrl: './number-form-field.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFormFieldComponent),
      multi: true,
    },
  ],
})
export class NumberFormFieldComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;
  @Input() readonly = false;

  @ViewChild('input', { static: true })
  inputRef!: ElementRef<HTMLInputElement>;

  value: number | null = null;
  disabled = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: number | null): void {
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

  onInput(value: string): void {
    const parsed = value === '' ? null : Number(value);
    this.value = parsed;
    this.onChange(parsed);
  }

  onBlur(): void {
    this.onTouched();
  }

  clear(): void {
    this.value = null;
    this.onChange(null);
    this.onTouched();
    queueMicrotask(() => this.inputRef?.nativeElement.focus());
  }
}
