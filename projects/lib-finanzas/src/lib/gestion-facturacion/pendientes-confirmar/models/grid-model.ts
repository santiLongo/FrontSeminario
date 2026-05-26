export interface PendienteConfirmarGridModel {
    idFactura: number;
    tipo: number; // 1=Emitida, 2=Recibida
    puntoVenta: number;
    numero: number;
    fechaEmision: string;
    fechaVencimiento?: string;
    nombreContraparte: string;
    total: number;
    saldoPendiente: number;
    estado: number;
    anulada: boolean;
    confirmada: boolean;
    cae?: string;
}
