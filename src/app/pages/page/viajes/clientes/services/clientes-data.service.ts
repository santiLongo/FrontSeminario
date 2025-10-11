import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BaseReadService } from "../../../../../components/basic-grid/services/base-read.service";
import { ClientesGridModel } from "../models/clientes-grid.model";
import { ClientesFilterModel } from "../models/clientes-filter.model";
import { ClientesHttpService } from "./clientes-http.service";

@Injectable()
export class ClientesDataService extends BaseReadService<ClientesGridModel>{
    
    public filterSub$: BehaviorSubject<ClientesFilterModel>;

    constructor(private httpService: ClientesHttpService) {
        super();
        this.filterSub$ = new BehaviorSubject<ClientesFilterModel>({});
     }

    getAll(): Observable<ClientesGridModel[]> {
        let valores: ClientesFilterModel = {};
        this.filterSub$.subscribe((req) => {
            console.log('Filtro actual:', req);
            valores = req;
        });
        return this.httpService.getAll(valores);
    }
}