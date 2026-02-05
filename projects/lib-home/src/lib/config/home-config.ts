import { InjectionToken } from '@angular/core';

export interface LibHomeConfig {
  urlLogin: string;
}

export const LIB_HOME_CONFIG =
  new InjectionToken<LibHomeConfig>('LIB_HOME_CONFIG');