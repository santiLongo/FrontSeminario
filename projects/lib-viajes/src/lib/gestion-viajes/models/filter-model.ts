export interface GestionViajesFilterModel{
    idCamion?: number;
    idCliente?: number;
    idChofer?: number;
    idLocalizacionDestino?: number;
    idLocalizacionProcedencia?: number;
    nroViaje?: string;
    fechaAltaDesde?: Date;
    fechaAltaHasta?: Date;
    estado?: number;
}