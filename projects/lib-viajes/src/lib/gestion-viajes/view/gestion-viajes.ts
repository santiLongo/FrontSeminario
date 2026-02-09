import { Component, OnInit } from '@angular/core';
import { CoreViewComponent, InputFormsModule, FilterComponent } from 'lib-core'
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";


@Component({
  standalone: true,
  selector: 'app-gestion-viajes',
  templateUrl: './gestion-viajes.html',
  imports: [
    CoreViewComponent,
    InputFormsModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatIconModule,
    FilterComponent
]
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

  onBuscar(){
    this
  }
}
