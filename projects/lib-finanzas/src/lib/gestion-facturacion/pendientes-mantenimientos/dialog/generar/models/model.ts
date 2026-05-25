export interface GenerarFacturaMantenimientoModel {
    puntoVenta: number;
    numero: number;
    idMoneda: number;
    porcentajeIva: number;
    fechaVencimiento?: Date;
    observaciones?: string;
}
