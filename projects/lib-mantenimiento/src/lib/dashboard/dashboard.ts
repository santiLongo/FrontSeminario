import { Component, Inject } from '@angular/core';
import { Cards, DashboardV2Component, FadeInComponent } from 'lib-core';
import { DASHBOARD, IDashboardService } from 'lib-shared'

@Component({
  selector: 'app-mantenimiento-dashboard',
  template: `
    <app-fade-in>
      <app-dashboard-v2 [cards]="cards" />
    </app-fade-in>
  `,
  imports: [DashboardV2Component, FadeInComponent],
})
export class MantenimientoDashboardComponent {
  cards: Cards[] = [];

  constructor(@Inject(DASHBOARD) private dashboard: IDashboardService) {}

  ngAfterViewInit(): void {
    this.dashboard.getDashboard('mantenimiento').subscribe((res) => {
      this.cards = res;
    });
  }
}
