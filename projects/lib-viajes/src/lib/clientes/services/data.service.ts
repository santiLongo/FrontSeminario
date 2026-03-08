import { Injectable } from "@angular/core";
import { BaseGridService, GridState, PagedResult } from "lib-core";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { ClienteGridModel } from "../models/grid-model";
import { ClientesHttpService } from "./http.service";
import { ClienteFilterModel } from "../models/filter-model";

@Injectable()
export class ClientesDataService extends BaseGridService<ClienteGridModel> {
    
    public estado: FormControl = new FormControl(1);

    constructor(private httpService: ClientesHttpService) {
        super();
    }
    
    override getData(state: GridState): Observable<PagedResult<ClienteGridModel>> {
        const command: ClienteFilterModel = {
            estado: this.estado.value
        }
        return this.httpService.getAll(command, state);
    }

    bajaAlta(idCliente: number): Observable<void> {
        return this.httpService.bajaAlta(idCliente);
    }
}