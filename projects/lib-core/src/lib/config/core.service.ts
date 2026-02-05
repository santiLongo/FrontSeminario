import { Inject, Injectable } from "@angular/core";
import { LIB_CORE_CONFIG, LibCoreConfig } from "./core-config";

@Injectable({ providedIn: 'root' })
export class CoreLibService{
  private _loginUrl = 'NO VALUE';
  
    constructor(
    @Inject(LIB_CORE_CONFIG) private config: LibCoreConfig
  ) {
    this._loginUrl = config.urlLogin;
  }


  get loginUrl () {
    return this._loginUrl;
  }
}