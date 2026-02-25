export class GetAllEventosCommand{
    fechaDesde: Date
    fechaHasta: Date
}

export class GetAllEventosResponse{
    idEvento: number;
    titulo: string;
    fechaEvento: string;
}