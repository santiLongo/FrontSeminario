import { Inject, Injectable } from "@angular/core";
import { LIB_VIAJES_CONFIG, LibViajesConfig } from "./viajes-config";

@Injectable({ providedIn: 'root' })
export class ViajesLibService{
  private _apiUrl = 'NO VALUE';
  private _loginUrl = 'NO VALUE';
  
    constructor(
    @Inject(LIB_VIAJES_CONFIG) private config: LibViajesConfig
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