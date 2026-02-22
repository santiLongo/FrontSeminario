import { Injectable } from "@angular/core";
import { LocalGridService } from "lib-core";
import { UpsertEspecialidadTaller } from "./models/upsert-model";

@Injectable()
export class UpsertDataService extends LocalGridService<UpsertEspecialidadTaller> {
    constructor(){
        super()
    }

    addAll(items: UpsertEspecialidadTaller[]){
        const datos = items.map((m) => this.wrap(m))
        .filter(m => this.items.findIndex(i => i.data.idEspecialidad === m.data.idEspecialidad) === -1);

        this.items = [...this.items,...datos];
        this.search();
    }

    get data(): UpsertEspecialidadTaller[] {
        return this.items.map<UpsertEspecialidadTaller>(m => m.data);
    }
}