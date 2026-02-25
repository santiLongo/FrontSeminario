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
export class GeneralesDashboardComponent{
    cards: Cards[] = [
        {
            icon: 'location',
            title: 'Maestro de',
            subtitle: 'Localidades',
            href: './gestion-localidad'
        },
        {
            icon: 'truck',
            title: 'Maestro de',
            subtitle: 'Camiones',
            href: './gestion-camiones'
        },
    ]
}