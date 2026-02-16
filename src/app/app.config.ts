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
import { LOCALE_ID } from '@angular/core';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import {
  CheckCircleFill,
  CloseCircleFill,
  ExclamationCircleFill,
  InfoCircleFill,
  WarningFill
} from '@ant-design/icons-angular/icons';
import { provideNzIcons } from 'ng-zorro-antd/icon';

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
    {
      provide: LOCALE_ID,
      useValue: 'es-AR',
    },
    provideNzI18n(es_ES),
    provideNzIcons([
      CheckCircleFill,
      CloseCircleFill,
      ExclamationCircleFill,
      InfoCircleFill,
      WarningFill
    ]),
    ...LIB_CONFIG_PROVIDERS,
  ],
};
