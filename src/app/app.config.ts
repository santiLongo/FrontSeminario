import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../projects/lib-core/src/lib/interceptor/auth-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LIB_CONFIG_PROVIDERS } from 'src/config/lib-config.providers';
import { apiResponseInterceptor, APP_DATE_FORMATS } from 'lib-core';
import { provideNativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, apiResponseInterceptor]),
    ),
    provideNativeDateAdapter(),
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
    ...LIB_CONFIG_PROVIDERS,
  ],
};
