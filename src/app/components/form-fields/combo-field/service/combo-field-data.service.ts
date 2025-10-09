import { Injectable } from "@angular/core";
import { ComboHttpService } from "./combo-field-http.service";
import { Observable } from "rxjs";
import { ComboModel } from "../combo-field.component";

@Injectable()
export class ComboDataService{
    constructor(private htppComboService: ComboHttpService){}

    getInfo(req: string): Observable<Array<ComboModel>>{
        return this.htppComboService.getInfo(req);
    }
}

