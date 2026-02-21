import { InjectionToken } from '@angular/core';

export interface LibFinanzasConfig {
  urlLogin: string;
  urlViajes: string;
}

export const LIB_FINANZAS_CONFIG =
  new InjectionToken<LibFinanzasConfig>('LIB_FINANZAS_CONFIG');