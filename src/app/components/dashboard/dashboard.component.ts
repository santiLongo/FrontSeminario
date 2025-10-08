import { Component, Input, OnInit } from '@angular/core';
import { MatGridListModule } from "@angular/material/grid-list";
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatGridListModule, MatCardModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent{
  @Input() items: Item[] = []; 
}

export interface Item {
  title: string;
  subtitle: string;
  link: string;
}
