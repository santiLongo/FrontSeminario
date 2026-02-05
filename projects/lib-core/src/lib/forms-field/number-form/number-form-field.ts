import { Component, ElementRef, Input, Optional, ViewChild } from "@angular/core";
import { ControlContainer, FormControl } from '@angular/forms'

@Component({
    standalone: false,
    selector: 'app-form-field',
    templateUrl: './number-form-field.html'
})
export class NumberFormFieldComponent{
    @Input({ required: true }) label!: string;
    @Input({ required: true }) formControlName!: string;
    
    @Input() readonly = false;
    @Input() disabled = false;

    @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;
    
    constructor(
        @Optional() private controlContainer: ControlContainer
    ) {}

    get formControl(): FormControl {
        const control = this.controlContainer?.control?.get(this.formControlName);
        return control as FormControl;
    }

    get value(): string {
    return this.formControl?.value ?? '';
    }

    clear(): void {
        this.formControl.setValue('');
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
        this.inputRef.nativeElement.focus();
    }
}