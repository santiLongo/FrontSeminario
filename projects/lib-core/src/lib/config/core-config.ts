import { InjectionToken } from '@angular/core';

export interface LibCoreConfig {
  urlLogin: string;
}

export const LIB_CORE_CONFIG =
  new InjectionToken<LibCoreConfig>('LIB_CORE_CONFIG');