import { Component, OnInit } from '@angular/core';
import { CoreViewComponent } from 'lib-core'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-gestion-viajes',
  templateUrl: './gestion-viajes.html',
  imports: [CoreViewComponent]
})
export class GestionViajesComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formSetup();
    //
  }

  formSetup() {
    this.form = this.fb.group({
      idCamion: [],
      idCliente: [],
      idChofer: [],
      idLocalizacionDestino: [],
      idLocalizacionProcedencia: [],
      nroViaje: [],
      fechaAltaDesde: [],
      fechaAltaHasta: [],
      estado: [],
    });
  }
}
