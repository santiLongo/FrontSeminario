import { Component, Input, forwardRef, OnInit, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ComboType } from './models/combo-type';
import { ComboHttpService } from './services/combo-http.service';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IMaskModule } from 'angular-imask';

@Component({
  standalone: true,
  selector: 'app-combo',
  templateUrl: './combo.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboComponent),
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
  ],
})
export class ComboComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) label!: string;
  @Input() type = '';
  @Input() isLocal = false;
  @Input() data: ComboType[] = [];
  @Input() readonly = false;

  data$!: Observable<ComboType[]>;

  value: string | number | null = null;
  disabled = this.readonly;

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

  getDescripcion(items: ComboType[] | null): string {
    if (!items) return '';

    const found = items.find((x) => x.numero === this.value);
    return found?.descripcion ?? '';
  }
}
