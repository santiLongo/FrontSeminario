import { Injectable } from "@angular/core";
import { BaseGridService, GridState, PagedResult } from "lib-core";
import { BehaviorSubject, Observable } from "rxjs";
import { ChoferesFilterModel } from "../models/choferes-filter-model";
import { ChoferesGridModel } from "../models/choferes-grid-model";
import { ChoferesHttpService } from "./http.service";
import { FormControl } from "@angular/forms";

@Injectable()
export class ChoferesDataService extends BaseGridService<ChoferesGridModel> {
    
    public estado: FormControl = new FormControl(1);

    constructor(private httpService: ChoferesHttpService) {
        super();
    }
    
    override getData(state: GridState): Observable<PagedResult<ChoferesGridModel>> {
        const command: ChoferesFilterModel = {
            estado:this.estado.value
        };
        return this.httpService.getAll(command, state);
    }
}