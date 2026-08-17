import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LIB_CONFIG_PROVIDERS } from 'src/config/lib-config.providers';
import { apiResponseInterceptor, authInterceptor } from 'lib-servicios';
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
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsAR from '@angular/common/locales/es-AR';
import { DASHBOARD } from 'lib-shared';
import { DashboardService } from 'src/service/dashboard.service';
import { APP_DATE_FORMATS, COMBO_DATA_PROVIDER } from 'lib-components';
import { ComboHttpService } from 'src/service/combo-http.service';
import { provideGeneralesListeners } from 'lib-generales';
import { provideMantenimientoListeners } from 'lib-mantenimiento';

registerLocaleData(localeEs)
registerLocaleData(localeEsAR, 'es-AR');

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
    {
      provide: DASHBOARD,
      useClass: DashboardService
    },
    { provide: COMBO_DATA_PROVIDER, useExisting: ComboHttpService },
    provideGeneralesListeners(),
    provideMantenimientoListeners()
  ],
};
