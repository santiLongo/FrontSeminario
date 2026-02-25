import { Component } from "@angular/core";
import { Cards, DashboardV2Component, FadeInComponent } from "lib-core";

@Component({
    selector: 'app-viajes-dashboard',
    template: `
    <app-fade-in>
      <app-dashboard-v2 [cards]="cards" />
    </app-fade-in>
  `,
    imports: [DashboardV2Component, FadeInComponent]
})
export class ViajesDashboardComponent{
    cards: Cards[] = [
        {
            icon: 'truck',
            title: 'Gestion',
            subtitle: 'de Viajes',
            href: './gestion-viajes'
        },
        {
            icon: 'worker',
            title: '',
            subtitle: 'Choferes',
            href: './gestion-choferes'
        },
        {
            icon: 'users',
            title: '',
            subtitle: 'Clientes',
            href: './gestion-clientes'
        },
    ]
}