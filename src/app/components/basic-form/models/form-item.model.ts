// src/app/models/form-item.model.ts
export interface FormItem {
  formControlName: string;
  label: string;
  type: string;
  format?: string;
  row?: number;
  col?: string;
  readonly?: boolean;
  hidden?: boolean;
  options?: { value: string; label: string }[]; // para combo-form
}