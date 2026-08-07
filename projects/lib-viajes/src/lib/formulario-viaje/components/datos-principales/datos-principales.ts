import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-datos-principales',
  templateUrl: './datos-principales.html',
})
export class DatosPrincipalesComponent {
  @Input()
  formulario: FormGroup;

  @Input()
  readonly = false;

  @Input()
  idViaje?: number;

  get datosPrincipales() {
    return this.formulario.get('datosPrincipales') as FormGroup;
  }

  get datosCliente() {
    return this.formulario.get('datosCliente') as FormGroup;
  }
}
