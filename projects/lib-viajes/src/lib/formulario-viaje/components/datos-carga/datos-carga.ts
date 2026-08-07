import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComboCamiones, ComboSemi } from '../../types/types';

@Component({
  standalone: false,
  selector: 'app-datos-transporte',
  templateUrl: './datos-carga.html',
})
export class DatosTransporteComponent {
  @Input()
  formulario: FormGroup;

  @Input()
  readonly = false;

  @Input()
  idViaje?: number;

  comboCamiones: ComboCamiones;
  comboSemi: ComboSemi;

  constructor() {
    if (this.idViaje > 0) {
      this.comboCamiones = 'ComboCamiones';
      this.comboSemi = 'ComboSemis';
    } else {
      this.comboCamiones = 'ComboCamionesDisponibles';
      this.comboSemi = 'ComboSemisDisponibles';
    }
  }

  get datosCamion() {
    return this.formulario.get('datosCamion') as FormGroup;
  }

  get datosChofer() {
    return this.formulario.get('datosChofer') as FormGroup;
  }
}
