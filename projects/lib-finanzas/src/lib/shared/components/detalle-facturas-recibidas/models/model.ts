export interface DetalleFacturaItem {
    idFacturaDetalle: number;
    orden: number;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    porcentajeIva?: number;
    subtotal: number;
    total: number;
}

export interface MantenimientoFacturaItem {
    idMantenimiento: number;
    titulo: string;
    importeMantenimiento: number;
}

export interface ReciboFacturaItem {
    idReciboFactura: number;
    idRecibo: number;
    fechaRecibo: string;
    importeAplicado: number;
    reciboAnulado: boolean;
}

export interface GetFacturaRecibidaResponse {
    idFactura: number;
    puntoVenta: number;
    numero: number;
    fechaEmision: string;
    fechaVencimiento?: string;
    nombreContraparte: string;
    subtotal: number;
    porcentajeIva: number;
    total: number;
    saldoPendiente: number;
    estado: number;
    anulada: boolean;
    observaciones?: string;
    detalles?: DetalleFacturaItem[];
    mantenimientos?: MantenimientoFacturaItem[];
    recibosImputados?: ReciboFacturaItem[];
}
