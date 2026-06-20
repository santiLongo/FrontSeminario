import { InjectionToken } from "@angular/core";

export interface AppConfig {
  urlLogin: string;
}

export const APP_CONFIG =
  new InjectionToken<AppConfig>('LIB_HOME_CONFIG');