import { Component, Input } from "@angular/core";
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.component.html',
    standalone: true,
    imports: [MatCardModule],
})
export class CardViewComponent {
    @Input() titulo: string = 'Titulo';
    @Input() nombreComponente: string = 'Nombre Componente'; 
}