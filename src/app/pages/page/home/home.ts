import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Map } from "./map/map";
import { Vehicules } from "./vehicules/vehicules";
import { Stops } from "./stops/stops";
import { UsuarioModel } from './models/usuario.model';
import { MatGridListModule } from "@angular/material/grid-list";

@Component({
  selector: 'app-home',
  imports: [Map, Vehicules, Stops, MatGridListModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  public idUsuario?: Number;

  ngOnInit(): void {
    const usuario: UsuarioModel = JSON.parse(localStorage.getItem('usuario')!);
    this.idUsuario = usuario.id;
  }
}
