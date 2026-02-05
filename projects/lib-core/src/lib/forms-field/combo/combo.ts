import { Component, ElementRef, Input, Optional, ViewChild } from "@angular/core";
import { ControlContainer, FormControl } from "@angular/forms";
import { ComboType } from "./models/combo-type";
import { ComboHttpService } from "./services/combo-http.service";

@Component({
    standalone: false,
    selector: 'app-combo',
    templateUrl: './combo.html'
})
export class ComboComponent{
    @Input() type: string = '';
    @Input() isLocal: boolean = false;
    @Input() data: ComboType[] = [];

    @Input({ required: true }) label!: string;
    @Input({ required: true }) formControlName!: string;
    
    @Input() readonly = false;
    @Input() disabled = false;

    @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;
    
    constructor(
        @Optional() private controlContainer: ControlContainer,
        private httpService: ComboHttpService
    ) {
        if(!this.isLocal){
            this.httpService.getCombo(this.type).subscribe(res => {
                this.data = res;
            })
        }
    }

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