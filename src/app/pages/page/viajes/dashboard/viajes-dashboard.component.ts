import { Component } from "@angular/core";
import { DashboardComponent, Item } from "../../../../components/dashboard/dashboard.component";
import { title } from "process";

@Component({
    selector: 'app-viajes-dashboard',
    template: `<app-dashboard [items]="items"></app-dashboard>`,
    imports: [DashboardComponent],
})
export class ViajesDashboard {
    items: Item[] = [
        {title: 'Gestion de', subtitle: 'Viajes', link: './gestion-viajes' },
        {title: 'Informes', subtitle: '', link: './informe-viajes' },
        {title: 'Maestro de', subtitle: 'Clientes', link: './clientes' },
    ];
 }