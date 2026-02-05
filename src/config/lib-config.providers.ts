import { Provider } from '@angular/core';
import { ENV_CONFIG } from './env.config';

import { LIB_HOME_CONFIG } from 'lib-home';
import { LIB_CORE_CONFIG } from 'lib-core';
import { LIB_VIAJES_CONFIG } from 'lib-viajes';

export const LIB_CONFIG_PROVIDERS: Provider[] = [
  {
    provide: LIB_HOME_CONFIG,
    useValue: {
      urlLogin: ENV_CONFIG.urlLogin
    }
  },
  {
    provide: LIB_CORE_CONFIG,
    useValue: {
      urlLogin: ENV_CONFIG.urlLogin,
    }
  },
  {
    provide: LIB_VIAJES_CONFIG,
    useValue: {
      urlLogin: ENV_CONFIG.urlLogin,
      urlViajes: ENV_CONFIG.urlViajes,
    }
  }
];
