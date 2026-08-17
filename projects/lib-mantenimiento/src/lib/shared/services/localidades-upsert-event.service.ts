import { Injectable, OnDestroy } from '@angular/core';
import { EventBusService, ListenerToken } from 'lib-servicios';
import { Observable } from 'rxjs';
import { TallerDialogService } from '../../talleres/services/dialog.service';

export interface TallerUpsertEventPayload {
  idTaller?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TallerUpsertEvent implements OnDestroy {
  private token: ListenerToken;
  //
  constructor(
    private dialog: TallerDialogService,
    bus: EventBusService,
  ) {
    this.token = bus.register('taller-upsert',(payload: TallerUpsertEventPayload): Observable<number | undefined> => {
        return this.dialog.openTallerUpsert$(payload.idTaller);
      },
    );
  }
  //
  ngOnDestroy(): void {
    this.token.unregister();
  }
}
