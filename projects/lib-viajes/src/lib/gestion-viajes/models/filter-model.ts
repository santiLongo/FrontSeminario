export interface GestionViajesFilterModel{
    idCamion?: number;
    idCliente?: number;
    idChofer?: number;
    idLocalidadDestino?: number;
    idLocalidadProcedencia?: number;
    nroViaje?: string;
    fechaAltaDesde?: Date;
    fechaAltaHasta?: Date;
    estado?: number;
}