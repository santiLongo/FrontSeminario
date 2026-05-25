export interface FacturaRecibidaGridModel {
    idFactura: number;
    puntoVenta: number;
    numero: number;
    fechaEmision: string;
    fechaVencimiento?: string;
    nombreContraparte: string;
    subtotal: number;
    total: number;
    saldoPendiente: number;
    estado: number;
    anulada: boolean;
}
