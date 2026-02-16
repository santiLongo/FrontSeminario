import { Component, Input, forwardRef, OnInit, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { ComboType } from './models/combo-type';
import { ComboHttpService } from '../combo/services/combo-http.service';
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
  selector: 'app-multiple-combo',
  templateUrl: './multiple-combo.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleComboComponent),
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
export class MultipleComboComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) label!: string;
  @Input() type = '';
  @Input() isLocal = false;
  @Input() data: ComboType[] = [];

  data$!: Observable<ComboType[]>;

  value: (string | number)[] = [];
  disabled = false;

  search = '';
  filteredData$!: Observable<ComboType[]>;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private http: ComboHttpService) {}

  ngOnInit(): void {
    this.data$ = this.isLocal ? of(this.data) : this.http.getCombo(this.type);

    this.filteredData$ = this.data$.pipe(
      map((items) =>
        items.filter((x) =>
          x.descripcion.toLowerCase().includes(this.search.toLowerCase()),
        ),
      ),
    );
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
    this.onSelectionChange([]);
  }

  trackByNumero = (_: number, item: ComboType) => item.numero;

  compareByNumero = (a: any, b: any): boolean => a === b;

  onSearchChange(value: string) {
    this.search = value;
    this.filteredData$ = this.data$.pipe(
      map((items) =>
        items.filter((x) =>
          x.descripcion.toLowerCase().includes(value.toLowerCase()),
        ),
      ),
    );
  }
}
