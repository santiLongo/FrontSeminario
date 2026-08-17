import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { TallerUpsertEvent } from "../shared/services/localidades-upsert-event.service";

/*
Provider para los servicios que emiten eventos.
*/
export function provideMantenimientoListeners(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      inject(TallerUpsertEvent);
    }),
  ]);
}