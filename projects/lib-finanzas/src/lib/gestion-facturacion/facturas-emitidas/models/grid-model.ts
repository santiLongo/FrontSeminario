export interface FacturaEmitidaGridModel {
    idFactura: number;
    puntoVenta: number;
    numero: number;
    fechaEmision: Date;
    fechaVencimiento?: Date;
    nombreContraparte: string;
    total: number;
    saldoPendiente: number;
    estado: number;
    anulada: boolean;
    confirmada: boolean;
    cae?: string;
}
