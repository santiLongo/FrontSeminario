export interface GestionCamionesFilterModel {
    patente?: string;
    marca?: string;
    modelo?: string;
    tipoCamion?: string;
    fechaAltaDesde?: Date;
    fechaAltaHasta?: Date;
    fechaBajaDesde?: Date;
    fechaBajaHasta?: Date;
}