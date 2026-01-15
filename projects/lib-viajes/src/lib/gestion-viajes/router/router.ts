import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-router-gestion-viajes',
    template: '<router-outlet></router-outlet>',
    imports: [RouterOutlet],
})
export class RouterGestionViajesComponent { }