import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_DATE_FORMATS, ButtonComponent } from 'lib-core';

@Component({
  selector: 'app-calendario',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ButtonComponent,
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
  ],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class CalendarioComponent {
  @Output() onNewEventoClick = new EventEmitter<void>();
  @Input() range: FormGroup;

  onClick() {
    this.onNewEventoClick.emit();
  }
}
