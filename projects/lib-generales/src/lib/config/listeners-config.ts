import {
  makeEnvironmentProviders,
  provideAppInitializer,
  inject,
  EnvironmentProviders,
} from '@angular/core';
import { LocalidadesUpsertEvent } from '../shared/service/localidades-upsert-event.service';
import { CamionUpsertEvent } from '../shared/service/camiones-upsert-event.service';

/*
Provider para los servicios que emiten eventos.
*/
export function provideGeneralesListeners(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      inject(LocalidadesUpsertEvent);
      inject(CamionUpsertEvent);
    }),
  ]);
}
