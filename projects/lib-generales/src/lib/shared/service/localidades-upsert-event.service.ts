import { Injectable, OnDestroy } from '@angular/core';
import { LocalidadesDialogService } from '../../localidades/services/dialog.service';
import { EventBusService, ListenerToken } from 'lib-servicios';
import { Observable } from 'rxjs';

export interface LocalidadesUpsertEventPayload {
  idLocalidad?: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocalidadesUpsertEvent implements OnDestroy {
  private token: ListenerToken;
  //
  constructor(
    private dialog: LocalidadesDialogService,
    bus: EventBusService,
  ) {
    this.token = bus.register(
      'localidad-upsert',
      (payload: LocalidadesUpsertEventPayload): Observable<void> => {
        return this.dialog.openLocalidadesUpsert$(payload.idLocalidad);
      },
    );
  }
  //
  ngOnDestroy(): void {
    this.token.unregister();
  }
}
