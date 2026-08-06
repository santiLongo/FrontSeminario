import { Injectable } from '@angular/core';
import { LocalGridService } from 'lib-components';
import { MantenimientoPendienteGridModel } from '../models/grid-model';

@Injectable()
export class PendientesMantenimientosDataService extends LocalGridService<MantenimientoPendienteGridModel> {
    constructor() { super(); }
}
