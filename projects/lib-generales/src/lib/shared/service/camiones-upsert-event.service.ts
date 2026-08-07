import { Injectable, OnDestroy } from '@angular/core';
import { EventBusService, ListenerToken } from 'lib-servicios';
import { Observable } from 'rxjs';
import { CamionDialogService } from '../../camiones/services/dialog.service';

export interface CamionUpsertEventPayload {
  idCamion?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CamionUpsertEvent implements OnDestroy {
  private token: ListenerToken;
  //
  constructor(
    private dialog: CamionDialogService,
    bus: EventBusService,
  ) {
    this.token = bus.register(
      'camion-upsert',
      (payload: CamionUpsertEventPayload): Observable<void> => {
        return this.dialog.openCamionUpsert$(payload.idCamion);
      },
    );
  }
  //
  ngOnDestroy(): void {
    this.token.unregister();
  }
}
