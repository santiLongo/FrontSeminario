import { Injectable } from '@angular/core';
import { LocalGridService } from 'lib-components';
import { ViajesPendienteGridModel } from '../models/grid-model';

@Injectable()
export class PendientesViajesDataService extends LocalGridService<ViajesPendienteGridModel> {
    constructor() { super(); }
}
