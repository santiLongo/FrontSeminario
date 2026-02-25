import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface EventoItem {
  idEvento: number;
  titulo: string;
  fechaEvento: Date | string;
}

@Component({
  selector: 'app-eventos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos-list.html',
  styleUrls: ['./eventos-list.scss']
})
export class EventosListComponent {
  @Input() eventos: EventoItem[] = [];
  @Output() eventoClick = new EventEmitter<number>();

  onCardClick(idEvento: number): void {
    this.eventoClick.emit(idEvento);
  }

  formatFecha(fecha: Date | string): string {
    const d = new Date(fecha);
    return d.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}