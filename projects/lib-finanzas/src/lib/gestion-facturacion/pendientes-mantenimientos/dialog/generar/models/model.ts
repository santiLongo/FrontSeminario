export interface GenerarFacturaMantenimientoModel {
    ptoVenta: number;
    numeroFactura: number;
    idMoneda: number;
    porcentajeIva: number;
    fechaVencimiento?: Date;
    observaciones?: string;
}
