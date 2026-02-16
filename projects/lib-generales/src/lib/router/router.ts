import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-router-generales',
    template: '<router-outlet></router-outlet>',
    imports: [RouterOutlet],
})
export class RouterGeneralesComponent { }