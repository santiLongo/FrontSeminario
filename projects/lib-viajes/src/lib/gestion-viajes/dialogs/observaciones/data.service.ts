import { Injectable } from "@angular/core";
import { BaseGridService } from "lib-components";
import { ObservacionesModel } from "./model/model";
import { BehaviorSubject, Observable } from "rxjs";
import { GestionViajesHttpService } from "../../service/http.service";
import { GridState, HttpRef, PagedResult } from "lib-servicios";

@Injectable()
export class ObservacionesDataService extends BaseGridService<ObservacionesModel> {
    
    idViajeSub$ = new BehaviorSubject<number>(0);

    constructor(private httpService: GestionViajesHttpService,){
        super()
    }
    
    getData(state: GridState, ref: HttpRef): Observable<PagedResult<ObservacionesModel>> {
        return this.httpService.getObs(this.idViajeSub$.value, state, ref)
    }

}