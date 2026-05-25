import { Injectable } from '@angular/core';
import { AlertService, EditableGridService } from 'lib-core';
import { DetalleItemModel } from './models/model';

@Injectable()
export class CrearRecibidaDetalleDataService extends EditableGridService<DetalleItemModel> {

    constructor(alertService: AlertService){
        super(alertService)
    }

    get data(){
        return this.unwrap(this.items)
    }
}
