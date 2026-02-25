import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  Cards,
  DashboardComponent,
  FadeInComponent,
  ButtonComponent,
  DialogService,
} from 'lib-core';
import { HomeHttpService } from '../service/http.service';
import * as L from 'leaflet';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { CalendarioComponent } from '../components/calendario/calendario';
import {
  EventoItem,
  EventosListComponent,
} from '../components/eventos-list/eventos-list';
import { MapComponent } from '../components/map/map';
import { PosicionUnidad } from '../models/posicion-unidad';
import { GetAllEventosCommand } from '../models/get-all-eventos';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-basic-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    DashboardComponent,
    FadeInComponent,
    NzCalendarModule,
    CalendarioComponent,
    EventosListComponent,
    MapComponent,
    MatProgressSpinnerModule
],
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
      href: '/generales',
      icon: 'settings',
      value: '',
    },
  ];
  data: PosicionUnidad[] = [];
  eventos: EventoItem[] = [];
  range: FormGroup;
  loading = false;

  private error = false;
  private destroy$ = new Subject<void>();

  constructor(
    private httpService: HomeHttpService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    const hoy = new Date();
    const proximaSemana = new Date();
    proximaSemana.setDate(hoy.getDate() + 7);

    this.range = new FormGroup({
      start: new FormControl<Date | null>(hoy),
      end: new FormControl<Date | null>(proximaSemana, { updateOn: 'blur' }),
    });
  }

  ngAfterViewInit(): void {
    this.loadUnidades();
    //
    this.loadEvent();
    //
    setInterval(() => this.loadUnidades(), 60000); // 30s
    //
    this.end?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.end?.value === undefined || this.start?.value === undefined)
        return;
      if (this.end?.value === null || this.start?.value === null) return;
      //
      this.loadEvent();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.subscribe();
  }

  private loadUnidades() {
    if (!this.error) {
      this.httpService.get().subscribe({
        next: (data) => {
          this.data = data;
        },
        error: () => (this.error = true),
      });
    }
  }

  private loadEvent() {
    this.loading = true;
    const command: GetAllEventosCommand = {
      fechaDesde: this.start?.value,
      fechaHasta: this.end?.value,
    };

    this.httpService.getEvents(command).pipe(finalize(() => this.loading = false)).subscribe((res) => {
      this.eventos = res;
    });
  }

  onMapSearch() {
    this.error = false;
    this.loadUnidades();
  }

  openEventos(idEvento?: number) {
    this.dialogService.openEventos$(idEvento).subscribe(() => this.loadEvent());
  }

  get start() {
    return this.range.get('start');
  }

  get end() {
    return this.range.get('end');
  }
}
