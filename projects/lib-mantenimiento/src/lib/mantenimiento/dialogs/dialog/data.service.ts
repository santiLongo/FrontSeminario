import { Injectable } from "@angular/core";
import { AlertService, EditableGridService, LocalGridService } from "lib-core";
import { UpsertTareas } from "./models/upsert-model";

@Injectable()
export class UpsertDataService extends EditableGridService<UpsertTareas> {
    constructor(alertService: AlertService){
        super(alertService)
    }

    addAll(items: UpsertTareas[]){
        const datos = items.map((m) => this.wrap(m))
        .filter(m => this.items.findIndex(i => i.data.idTarea === m.data.idTarea) === -1);

        this.items = [...this.items,...datos];
        this.search();
    }

    get data(): UpsertTareas[] {
        return this.unwrap(this.items);
    }
}