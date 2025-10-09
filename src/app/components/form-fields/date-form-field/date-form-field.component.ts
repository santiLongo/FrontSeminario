import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

/** @title Datepicker with custom date classes */
@Component({
  selector: 'app-date-form-field',
  templateUrl: './date-form-field.component.html',
//   styleUrl: 'datepicker-date-class-example.css',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFormFieldComponent {
    @Input() label: string = ''; 
    @Input() required: boolean = false; 
    @Input() readonly: boolean = false; 
    @Input() formControlName: string = '';
}

