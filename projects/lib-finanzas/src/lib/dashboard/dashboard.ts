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
export class FiananzasDashboardComponent{
    cards: Cards[] = [
        {
            icon: 'dolar',
            title: 'Gestion',
            subtitle: 'de Cobros',
            href: './gestion-cobros'
        },
        {
            icon: 'bank',
            title: 'Cheques',
            subtitle: 'Emitidos',
            href: './cheques-emitidos'
        },
    ]
}