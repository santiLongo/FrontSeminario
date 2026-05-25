import { Component } from '@angular/core';
import { Cards, DashboardV2Component, FadeInComponent } from 'lib-core';

@Component({
    selector: 'app-facturacion-dashboard',
    template: `
    <app-fade-in>
      <app-dashboard-v2 [cards]="cards" />
    </app-fade-in>
  `,
    imports: [DashboardV2Component, FadeInComponent],
})
export class FacturacionDashboardComponent {
    cards: Cards[] = [
        {
            icon: 'company',
            title: 'Facturas',
            subtitle: 'Emitidas',
            href: './facturas-emitidas',
        },
        {
            icon: 'inventory',
            title: 'Facturas',
            subtitle: 'Recibidas',
            href: './facturas-recibidas',
        },
        {
            icon: 'truck',
            title: 'Viajes',
            subtitle: 'Pendientes de Facturar',
            href: './pendientes-viajes',
        },
        {
            icon: 'caja_herr',
            title: 'Mantenimientos',
            subtitle: 'Pendientes de Facturar',
            href: './pendientes-mantenimientos',
        },
    ];
}
