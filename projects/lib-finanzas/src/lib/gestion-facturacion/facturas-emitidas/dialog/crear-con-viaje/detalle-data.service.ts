import { Injectable } from '@angular/core';
import { AlertService, EditableGridService } from 'lib-core';
import { DetalleItemModel } from './models/model';

@Injectable()
export class CrearConViajeDetalleDataService extends EditableGridService<DetalleItemModel> {
    constructor(alertService: AlertService) {
        super(alertService);
    }

    get detalles(): DetalleItemModel[] {
        return this.unwrap(this.items);
    }
}
