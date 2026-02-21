import { InjectionToken } from '@angular/core';

export interface LibMantenimientoConfig {
  urlLogin: string;
  urlViajes: string;
}

export const LIB_MANTENIMIENTO_CONFIG =
  new InjectionToken<LibMantenimientoConfig>('LIB_MANTENIMIENTO_CONFIG');