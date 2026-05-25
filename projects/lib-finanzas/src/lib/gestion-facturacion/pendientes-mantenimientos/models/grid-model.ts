export interface MantenimientoPendienteGridModel {
    idMantenimiento: number;
    titulo: string;
    fechaEntrada?: string;
    fechaSalida?: string;
    importe: number;
    idTaller?: number;
    nombreTaller?: string;
    patenteCamion?: string;
}
