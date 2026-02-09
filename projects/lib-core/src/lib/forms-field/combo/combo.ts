import { Component, Input, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ComboType } from './models/combo-type';
import { ComboHttpService } from './services/combo-http.service';

@Component({
  standalone: false,
  selector: 'app-combo',
  templateUrl: './combo.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboComponent),
      multi: true,
    },
  ],
})
export class ComboComponent implements ControlValueAccessor, OnInit {

  @Input({ required: true }) label!: string;
  @Input() type = '';
  @Input() isLocal = false;
  @Input() data: ComboType[] = [];

  data$!: Observable<ComboType[]>;

  value: string | number | null = null;
  disabled = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private http: ComboHttpService) {}

  ngOnInit(): void {
    this.data$ = this.isLocal ? of(this.data) : this.http.getCombo(this.type);
  }

  writeValue(value: any): void {
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

  onSelectionChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  clear(): void {
    this.onSelectionChange(null);
  }

  trackByNumero = (_: number, item: ComboType) => item.numero;

  compareByNumero = (a: any, b: any): boolean => {
    return a === b;
  };
}
