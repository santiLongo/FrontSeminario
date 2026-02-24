import { AfterViewInit, Component } from '@angular/core';
import { Cards, DashboardComponent } from 'lib-core';
import { HomeHttpService } from '../service/http.service';

@Component({
  selector: 'app-basic-home',
  templateUrl: './home.html',
  imports: [DashboardComponent],
})
export class BasicHomeComponent implements AfterViewInit {
  dashboardCards: Cards[] = [
    {
      title: 'Viajes',
      subtitle: 'Gestión de viajes',
      href: '/viajes',
      icon: 'truck',
    },
    {
      title: 'Mantenimiento',
      subtitle: 'Control de unidades',
      href: '/mantenimiento',
      icon: 'caja_herr',
      value: ''
    },
    {
      title: 'Finanzas',
      subtitle: 'Ingresos y gastos',
      href: '/finanzas',
      icon: 'dolar',
      value: ''
    },
    {
      title: 'Generales',
      subtitle: 'Tablas generales',
      href: '/config',
      icon: 'settings',
      value: ''
    },
  ];

  constructor(private httpService: HomeHttpService){

  }


  ngAfterViewInit(): void {
    
  }


}
