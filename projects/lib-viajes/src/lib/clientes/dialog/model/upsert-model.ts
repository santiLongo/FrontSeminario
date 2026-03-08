export interface ClienteUpsertModel {
    idCliente?: number;
    cuit: number;
    razonSocial: string;
    direccion: string;
    telefono: number;
    email: string;
}