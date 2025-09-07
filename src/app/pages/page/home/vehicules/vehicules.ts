import { Component, Input, viewChild } from '@angular/core';
import { CardGeneral } from "../../../../components/card-general/card-general";
import { FormGroup } from '@angular/forms';
import { VehiculosService } from '../services/vehiculos.service';
import { VehiculesModels } from './models/vehiculos.model';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-vehicules',
  imports: [CardGeneral],
  templateUrl: './vehicules.html',
  styleUrl: './vehicules.css'
})
export class Vehicules {
  @Input() idUsuario?: Number;
  public vehiculosGroup?: Array<VehiculesModels>;

  constructor(
    private vehiculosService: VehiculosService,
  ){}

  // getVehiculos() {
  //   if(this.idUsuario != null){
  //     this.vehiculosService.getVehiculosPorUsuario(this.idUsuario).subscribe({
  //       next: (response) => {
  //         this.vehiculosGroup = response;
  //       },
  //       error: (error) => {
  //         console.log('Error en traer', error);
  //       }
  //   });
  //   }
  //   return this.vehiculosGroup;
  // }

  getVehiculos(){
    this.vehiculosGroup = [
      {
        id: 1,
        patente: '123456',
        marca: 'dfas',
        modelo: 'dsa',
        idUsuario: 4,
        idLocalizador: 'dasda',
      }
    ] as VehiculesModels[];

    return this.vehiculosGroup;
  }
}

// const vehicules = [
//   { id: 1, imageUrl: "", name: "Mi Auto", plate: "AA123BB", },
//   { id: 2, imageUrl: "", name: "Mi Auto 2", plate: "CC123DD", }
// ];