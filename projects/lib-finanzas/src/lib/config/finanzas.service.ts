import { Inject, Injectable } from "@angular/core";
import { LIB_FINANZAS_CONFIG, LibFinanzasConfig } from "./finanzas-config";

@Injectable({ providedIn: 'root' })
export class FinanzasLibService{
  private _apiUrl = 'NO VALUE';
  private _loginUrl = 'NO VALUE';
  
    constructor(
    @Inject(LIB_FINANZAS_CONFIG) private config: LibFinanzasConfig
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