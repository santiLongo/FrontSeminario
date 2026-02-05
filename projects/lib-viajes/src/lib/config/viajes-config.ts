import { InjectionToken } from '@angular/core';

export interface LibViajesConfig {
  urlLogin: string;
  urlViajes: string;
}

export const LIB_VIAJES_CONFIG =
  new InjectionToken<LibViajesConfig>('LIB_VIAJES_CONFIG');