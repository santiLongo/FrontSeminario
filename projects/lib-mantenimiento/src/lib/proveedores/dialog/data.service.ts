import { Injectable } from "@angular/core";
import { LocalGridService } from "lib-core";
import { UpsertEspecialidadProveedor } from "./models/upsert-model";

@Injectable()
export class UpsertDataService extends LocalGridService<UpsertEspecialidadProveedor> {
    constructor(){
        super()
    }

    addAll(items: UpsertEspecialidadProveedor[]){
        const datos = items.map((m) => this.wrap(m))
        .filter(m => this.items.findIndex(i => i.data.idEspecialidad === m.data.idEspecialidad) === -1);

        this.items = [...this.items,...datos];
        this.search();
    }

    get data(): UpsertEspecialidadProveedor[] {
        return this.items.map<UpsertEspecialidadProveedor>(m => m.data);
    }
}