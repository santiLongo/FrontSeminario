import { Inject, Injectable } from "@angular/core";
import { LIB_GENERALES_CONFIG, LibGeneralesConfig } from "./generales-config";

@Injectable({ providedIn: 'root' })
export class GeneralesLibService{
  private _apiUrl = 'NO VALUE';
  private _loginUrl = 'NO VALUE';
  
    constructor(
    @Inject(LIB_GENERALES_CONFIG) private config: LibGeneralesConfig
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