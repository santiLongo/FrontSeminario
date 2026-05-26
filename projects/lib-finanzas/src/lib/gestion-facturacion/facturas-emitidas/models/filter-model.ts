export interface FacturaEmitidaFilterModel {
    idCliente?: number;
    estado?: number;
    fechaDesde?: Date;
    fechaHasta?: Date;
    confirmada?: boolean;
}
