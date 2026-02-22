import {
  Component,
  Input,
  forwardRef,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  Optional,
  Self,
  NgZone,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, of, take } from 'rxjs';
import { ComboType } from './models/combo-type';
import { ComboHttpService } from './services/combo-http.service';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { IMaskModule } from 'angular-imask';

@Component({
  standalone: true,
  selector: 'app-combo',
  templateUrl: './combo.html',
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => ComboComponent),
  //     multi: true,
  //   },
  // ],
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
export class ComboComponent implements ControlValueAccessor, OnInit, OnChanges {
  @ViewChild(MatSelect) matSelect!: MatSelect;
  @Input({ required: true }) label!: string;
  @Input() type = '';
  @Input() isLocal = false;
  @Input() data: ComboType[] = [];
  @Input() readonly = false;
  @Input() extraParams: any;

  data$!: Observable<ComboType[]>;

  value: string | number | null = null;
  disabled = this.readonly;

  private loaded = false;
  private loading = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(
    private http: ComboHttpService,
    private zone: NgZone,
    @Self() @Optional() public ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    // this.control..
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['extraParams'] && !changes['extraParams'].firstChange) {
      this.loaded = false;
      this.loadData();
    }

    if (changes['type'] && !changes['type'].firstChange) {
      this.loaded = false;
      this.loadData();
    }
  }

  private loadData() {
    this.data$ = this.isLocal
      ? of(this.data)
      : this.http.getCombo(this.type, this.extraParams);
  }

  writeValue(value: any): void {
    this.value = value;

    queueMicrotask(() => {
      if (this.matSelect) {
        this.matSelect.writeValue(this.value);
      }
    });
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

  handleClick() {
    if (this.loaded || this.loading) return;

    this.loading = true;

    const obs = this.isLocal
      ? of(this.data)
      : this.http.getCombo(this.type, this.extraParams);

    obs.subscribe((data) => {
      this.data$ = of(data);
      this.loaded = true;
      this.loading = false;

      // 🔥 esperar a que Angular termine de renderizar
      this.zone.onStable.pipe(take(1)).subscribe(() => {
        if (!this.matSelect.panelOpen) {
          this.matSelect.open();
        }
      });
    });
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
      return `Máximo ${errors['max'].requiredLength}`;
    if (errors['min'])
      return `Mínimo ${errors['min'].requiredLength}`;


    return 'Valor inválido';
  }
}
