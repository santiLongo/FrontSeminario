import { Component } from '@angular/core';
import { EventBusService } from 'lib-servicios';
import { ClienteDialogService } from '../../../clientes/services/dialog.service';

@Component({
  standalone: false,
  selector: 'app-acciones-especiales',
  templateUrl: './acciones-especiales.html',
})
export class AccionesEspecialesComponent {
  constructor(
    private event: EventBusService,
    private dialogCliente: ClienteDialogService,
  ) {}

  addCamion() {
    this.event.emit('camion-upsert', {});
  }

  addCliente() {
    this.dialogCliente.openClienteUpsert$().subscribe();
  }

  addLocalidad() {
    this.event.emit('localidad-upsert', {});
  }
}
