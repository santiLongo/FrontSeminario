import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { PosicionUnidad } from '../../models/posicion-unidad';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  imports: [MatIconModule, DatePipe],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: PosicionUnidad[];
  @Output() onSearch = new EventEmitter<void>();
  ultimaBusqueda: Date = new Date();
  private map!: L.Map;
  private truckIcon = L.icon({
    iconUrl: 'camion-ico.png',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    if (this.data?.length > 0) {
      this.drawMarkers(this.data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.map) {
      this.drawMarkers(changes['data'].currentValue);
      this.ultimaBusqueda = new Date()
    }
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

  private drawMarkers(unidades: any[]) {
    const bounds: L.LatLngTuple[] = [];

    unidades.forEach((u) => {
      if (!u.latitud || !u.longitud) return;

      const latlng: L.LatLngExpression = [u.latitud, u.longitud];
      bounds.push(latlng);

      const marker = L.marker(latlng, {
        icon: this.truckIcon,
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

  search() {
    this.onSearch.emit();
  }
}
