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
export class MantenimientoDashboardComponent{
    cards: Cards[] = [
        {
            icon: 'caja_herr',
            title: 'Gestion de',
            subtitle: 'Mantenimiento',
            href: './gestion-mantenimiento'
        },
        {
            icon: 'engineering',
            title: '',
            subtitle: 'Talleres',
            href: './talleres'
        },
        {
            icon: 'company',
            title: '',
            subtitle: 'Proveedores',
            href: './proveedores'
        },
    ]
}