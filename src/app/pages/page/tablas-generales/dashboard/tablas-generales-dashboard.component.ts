import { Component } from "@angular/core";
import { DashboardComponent, Item } from "../../../../components/dashboard/dashboard.component";

@Component({
  selector: "app-tablas-generales-dashboard",
  template: `<app-dashboard [items]="items"></app-dashboard>`,
  imports: [DashboardComponent],
})
export class TablasGeneralesDashboard {
    items: Item[] = [
        {title: 'Gestion de', subtitle: 'Choferes', link: './gestion-choferes' },
        {title: 'Gestion de', subtitle: 'Camiones', link: './gestion-camiones' },
    ];
}