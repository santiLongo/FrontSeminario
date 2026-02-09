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
  selector: 'app-textarea-form-field',
  templateUrl: './textarea-form-field.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFormFieldComponent),
      multi: true,
    },
  ],
})
export class TextareaFormFieldComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;
  @Input() readonly = false;

  @ViewChild('input', { static: true })
  textareaRef!: ElementRef<HTMLTextAreaElement>;

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
    queueMicrotask(() => this.textareaRef?.nativeElement.focus());
  }
}
