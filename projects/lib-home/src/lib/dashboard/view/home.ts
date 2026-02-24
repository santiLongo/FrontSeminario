import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Cards, DashboardComponent } from 'lib-core';
import { HomeHttpService } from '../service/http.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-basic-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [DashboardComponent],
})
export class BasicHomeComponent implements OnInit, AfterViewInit {
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
      value: '',
    },
    {
      title: 'Finanzas',
      subtitle: 'Ingresos y gastos',
      href: '/finanzas',
      icon: 'dolar',
      value: '',
    },
    {
      title: 'Generales',
      subtitle: 'Tablas generales',
      href: '/config',
      icon: 'settings',
      value: '',
    },
  ];
  private map!: L.Map;
  private truckIcon = L.icon({
        iconUrl: 'camion-ico.png',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

  constructor(private httpService: HomeHttpService) {}

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    this.loadUnidades();
    //
    setInterval(() => this.loadUnidades(), 30000); // 30s
  }

  // ================= MAPA =================

  private initMap() {
    this.map = L.map('mapa', {
      center: [-34.6, -58.4], // Buenos Aires default
      zoom: 6,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(this.map);
  }

  // ================= DATA =================

  private loadUnidades() {
    this.httpService.get().subscribe((data) => {
      this.drawMarkers(data);
    });
  }

  private drawMarkers(unidades: any[]) {
    const bounds: L.LatLngTuple[] = [];

    unidades.forEach((u) => {
      if (!u.latitud || !u.longitud) return;

      const latlng: L.LatLngExpression = [u.latitud, u.longitud];
      bounds.push(latlng);

      const marker = L.marker(latlng, {
        icon: this.truckIcon
      }).addTo(this.map);

      // Popup con patente
      marker.bindPopup(`
        <div style="font-weight:600">${u.nombre}</div>
        <div style="font-size:12px;color:#666">${u.ubicacion ?? ''}</div>
      `);

      // Label permanente debajo (tipo patente)
      marker.bindTooltip(u.nombre, {
        permanent: true,
        direction: 'bottom',
        offset: [0, 10],
        className: 'patente-label',
      });
    });

    // Auto zoom a todos los puntos
    if (bounds.length) {
      this.map.fitBounds(bounds, { padding: [40, 40] });
    }
  }
}
