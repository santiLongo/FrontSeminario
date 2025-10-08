import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

@Component({
    selector: 'app-basic-form',
    templateUrl: './basic-form.component.html',
    imports: [
        FormsModule,
        MatFormFieldModule, 
        MatInputModule, 
        ReactiveFormsModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatSelectModule,
        MatInputModule,
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFormComponent implements OnChanges{ 
    @Input() formulario: FormGroup = new FormGroup({});
    @Input() config: BasicFormConfig[] = [];

    public groupedRows: { row: number; items: BasicFormConfig[] }[] = [];

    ngOnChanges() {
        this.groupRows();
    }

    private groupRows() {
    const map = new Map<number, BasicFormConfig[]>();
    for (const item of this.config) {
      if (!map.has(item.row)) map.set(item.row, []);
      map.get(item.row)!.push(item);
    }

    this.groupedRows = Array.from(map.entries())
      .map(([row, items]) => ({ row, items }))
      .sort((a, b) => a.row - b.row);
  }
}

export interface BasicFormConfig  {
    formControlName: string;
    label: string;
    type: 'text' | 'number' | 'checkbox' | 'money' | 'date' | 'combo';
    comboOptions?: string[];
    row: number;
    col: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12';
    required?: boolean;
    hidden?: boolean;
}

function provideNativeDateAdapter(): import("@angular/core").Provider {
    throw new Error("Function not implemented.");
}
