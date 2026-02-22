import { Inject, Injectable } from "@angular/core";
import { LIB_MANTENIMIENTO_CONFIG, LibMantenimientoConfig } from "./mantenimiento-config";

@Injectable({ providedIn: 'root' })
export class MantenimientoLibService{
  private _apiUrl = 'NO VALUE';
  private _loginUrl = 'NO VALUE';
  
    constructor(
    @Inject(LIB_MANTENIMIENTO_CONFIG) private config: LibMantenimientoConfig
  ) {
    this._apiUrl = config.urlViajes;
    this._loginUrl = config.urlLogin;
  }

  get apiUrl () {
    return this._apiUrl;
  }

  get loginUrl () {
    return this._loginUrl;
  }
}