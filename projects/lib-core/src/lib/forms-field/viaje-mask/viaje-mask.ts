import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import IMask from 'imask';

@Component({
  standalone: false,
  selector: 'app-viaje-mask',
  templateUrl: './viaje-mask.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ViajeMaskComponent),
      multi: true,
    },
  ],
})
export class ViajeMaskComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;
  @Input() readonly = false;

  @ViewChild('input', { static: true })
  inputRef!: ElementRef<HTMLInputElement>;

  value: string | null = null;
  disabled = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: string | null): void {
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
    this.value = value;
    this.onChange(value);
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

  onMaskAccept(value: string) {
    this.value = value;
    this.onChange(value);
  }

  mask = {
    mask: 'V-{YYYY}-{NNNNNNNN}',
    lazy: false,
    overwrite: true,
    blocks: {
      YYYY: {
        mask: IMask.MaskedRange,
        from: 2000,
        to: 2099,
      },
      NNNNNNNN: {
        mask: IMask.MaskedNumber,
        scale: 0,
        signed: false,
        min: 0,
        max: 99999999,
        normalizeZeros: true,
        prepare: (str: string) => str.slice(0, 8),
      },
    },
  };
}
