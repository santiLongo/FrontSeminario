import { Inject, Injectable } from "@angular/core";
import { LIB_HOME_CONFIG, LibHomeConfig } from "./home-config";

@Injectable({ providedIn: 'root' })
export class HomeLibService{
  private _loginUrl = 'NO VALUE';
  
    constructor(
    @Inject(LIB_HOME_CONFIG) private config: LibHomeConfig
  ) {
    this._loginUrl = config.urlLogin;
  }


  get loginUrl () {
    return this._loginUrl;
  }
}