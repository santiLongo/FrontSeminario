import { Component, OnInit } from '@angular/core';
import { Map } from "./map/map";
import { Vehicules } from "./vehicules/vehicules";
import { Stops } from "./stops/stops";
import { UsuarioModel } from './models/usuario.model';
import { MatGridListModule } from "@angular/material/grid-list";
import { DynamicInputComponent } from "../../../components/dynamic-input/dynamic-input";
import { FormItem } from '../../../components/basic-form/models/form-item.model';
import { FormControl, FormGroup } from '@angular/forms';
import { BasicFormComponent } from "../../../components/basic-form/basic-form.component";

@Component({
  selector: 'app-home',
  imports: [Map, Vehicules, Stops, MatGridListModule, DynamicInputComponent, BasicFormComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  public idUsuario?: Number;
  form = new FormGroup({
  pagoCliente: new FormControl(''),
  fechaPago: new FormControl(''),
});

settings: FormItem[] = [
  {
    formControlName: 'pagoCliente',
    label: 'Pago del Cliente',
    type: 'number-form',
    col: 'col-6',
    readonly: false,
    hidden: false,
  },
  {
    formControlName: 'fechaPago',
    label: 'Fecha de Pago',
    type: 'date-form',
    col: 'col-6',
    readonly: false,
    hidden: false,
  },
];


  ngOnInit(): void {
    const usuario: UsuarioModel = JSON.parse(localStorage.getItem('usuario')!);
    this.idUsuario = usuario.id;
  }
}
