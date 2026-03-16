import { Injectable } from "@angular/core";
import { BaseGridService, GridState, PagedResult } from "lib-core";
import { ObservacionesModel } from "./model/model";
import { BehaviorSubject, Observable } from "rxjs";
import { GestionViajesHttpService } from "../../service/http.service";

@Injectable()
export class ObservacionesDataService extends BaseGridService<ObservacionesModel> {
    
    idViajeSub$ = new BehaviorSubject<number>(0);

    constructor(private httpService: GestionViajesHttpService,){
        super()
    }
    
    getData(state: GridState): Observable<PagedResult<ObservacionesModel>> {
        return this.httpService.getObs(this.idViajeSub$.value, state)
    }

}