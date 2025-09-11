// src/app/components/dynamic-input/dynamic-input.component.ts
import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-input.html',
})
export class DynamicInputComponent {
  @Input() config!: {
    formControlName: string;
    label: string;
    type: string;
    format?: string;
    row?: string;
    col?: string;
    readonly?: boolean;
    hidden?: boolean;
  };

  control = signal(new FormControl());
}