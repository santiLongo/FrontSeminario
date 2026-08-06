import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import { ObservacionesModel } from "./model/model";
import { BehaviorSubject, Observable } from "rxjs";
import { MantenimientoHttpService } from "../../services/http.service";
import { GridState, PagedResult } from "lib-servicios";

@Injectable()
export class ObservacionesDataService extends BaseGridService<ObservacionesModel> {
    
    idSub$ = new BehaviorSubject<number>(0);

    constructor(private httpService: MantenimientoHttpService,){
        super()
    }
    
    getData(state: GridState): Observable<PagedResult<ObservacionesModel>> {
        return this.httpService.getObs(this.idSub$.value, state)
    }

}