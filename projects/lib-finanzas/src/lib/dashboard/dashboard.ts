import { Component } from "@angular/core";
import { Cards, DashboardV2Component, FadeInComponent } from "lib-core";

@Component({
    selector: 'app-finanzas-dashboard',
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
            icon: 'inventory',
            title: '',
            subtitle: 'Recibos',
            href: './gestion-recibos'
        },
        {
            icon: 'bank',
            title: 'Gestión de',
            subtitle: 'Facturación',
            href: './gestion-facturacion'
        },
        // {
        //     icon: 'bank',
        //     title: 'Cheques',
        //     subtitle: 'Emitidos',
        //     href: './cheques-emitidos'
        // },
    ]
}