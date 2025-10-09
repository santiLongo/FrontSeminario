import {Component, Input, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComboDataService } from './service/combo-field-data.service';

/** @title Select with no option ripple */
@Component({
  selector: 'app-combo-field',
  templateUrl: './combo-field.component.html',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  providers: [ComboDataService],
  standalone: true,
})
export class ComboFieldComponent implements OnInit {
    @Input() label: string = ''; 
    @Input() required: boolean = false; 
    @Input() readonly: boolean = false; 
    @Input() formControlName: string = '';
    @Input() comboName: string = '';
    
    public items: ComboModel[] = [];

    constructor(private comboService: ComboDataService){}

    ngOnInit(): void {
        this.comboService.getInfo(this.comboName).subscribe((res) => {
            this.items = res;
        })
    }
}

export interface ComboModel{
    numero: number | string;
    descripcion: string;
}
