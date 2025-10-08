import { Component } from '@angular/core';
import { DashboardComponent, Item } from '../../../components/dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  imports: [DashboardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home{
  items: Item[] = [
    { title: 'Viajes', subtitle: '', link: './viajes' },
    { title: 'Mantenimiento', subtitle: '', link: './mantenimiento' },
    { title: 'Finanzas', subtitle: '', link: './finanzas' },
    { title: 'Tablas', subtitle: 'Generales', link: './tablas-generales' },
  ];
}
