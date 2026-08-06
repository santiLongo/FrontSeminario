export interface EventoUpsertModel {
    idEvento?: number;
    titulo: string;
    descripcion: string;
    fechaEvento: Date;
    inactivo: boolean;
    idTipoEvento: number;
}