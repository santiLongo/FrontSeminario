import { InjectionToken } from '@angular/core';

export interface LibGeneralesConfig {
  urlLogin: string;
  urlViajes: string;
}

export const LIB_GENERALES_CONFIG =
  new InjectionToken<LibGeneralesConfig>('LIB_GENERALES_CONFIG');