import { Component, Input, OnInit } from "@angular/core";
import { IconKey, ICONS } from "lib-core";
import { MatIcon, MatIconModule } from "@angular/material/icon";

export interface Cards {
  title: string;
  subtitle?: string;
  value?: string | number;
  href?: string;
  icon: IconKey;
  iconBg?: string;     
  iconColor?: string;
  trend?: string;
  trendUp?: boolean;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
    imports: [MatIconModule]
})
export class DashboardComponent {
    @Input() cards: Cards[] = []
    ICONS = ICONS
}