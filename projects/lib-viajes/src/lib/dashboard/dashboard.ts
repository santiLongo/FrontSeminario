import { AfterViewInit, Component, Inject } from '@angular/core';
import { Cards, DashboardV2Component, FadeInComponent } from 'lib-core';
import { DASHBOARD, IDashboardService } from 'lib-shared';

@Component({
  selector: 'app-viajes-dashboard',
  template: `
    <app-fade-in>
      <app-dashboard-v2 [cards]="cards" />
    </app-fade-in>
  `,
  imports: [DashboardV2Component, FadeInComponent],
})
export class ViajesDashboardComponent implements AfterViewInit {
  cards: Cards[] = [];

  constructor(@Inject(DASHBOARD) private dashboard: IDashboardService) {}

  ngAfterViewInit(): void {
    this.dashboard.getDashboard('viajes').subscribe((res) => {
      this.cards = res;
    });
  }
}
