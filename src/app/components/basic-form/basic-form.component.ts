// src/app/components/basic-form/basic-form.component.ts
import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormItem } from './models/form-item.model';

@Component({
  selector: 'app-basic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './basic-form.component.html',
})
export class BasicFormComponent {
  @Input() settings: FormItem[] = [];
  @Input() formGroup!: FormGroup;
  value = signal('');

  groupedSettings = computed(() => {
    const grouped: Record<number, FormItem[]> = {};
    for (const item of this.settings) {
      const row = item.row ?? 0;
      grouped[row] = grouped[row] || [];
      grouped[row].push(item);
    }
    return grouped;
  });
}
