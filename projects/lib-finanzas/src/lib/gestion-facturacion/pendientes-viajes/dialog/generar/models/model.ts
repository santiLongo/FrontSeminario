export interface GenerarFacturaViajeModel {
    idMoneda: number;
    porcentajeIva: number;
    fechaVencimiento?: Date;
    observaciones?: string;
}
