import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ClientesGridModel } from "../models/clientes-grid.model";

@Injectable({
    providedIn: 'root',
})
export class ClientesHttpService {
    
    getAll(filter: any): Observable<ClientesGridModel[]> {
        
        console.log('Llamada HTTP con filtro:', filter);

        const data: ClientesGridModel[] = [
            { razonSocial: 'Cliente A', cuit: '20-12345678-9' },
            { razonSocial: 'Cliente B', cuit: '27-87654321-0' },
            { razonSocial: 'Cliente C', cuit: '30-45678901-2' }
        ];
        return of(data);
    }
}