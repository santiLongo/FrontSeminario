export interface GetFacturaEmitidaResponse {
    idFactura: number;
    puntoVenta: number;
    numero: number;
    fechaEmision: Date;
    fechaVencimiento?: Date;
    subtotal: number;
    porcentajeIva: number;
    total: number;
    idMoneda: number;
    tipoCambio?: number;
    estado: number;
    observaciones?: string;
    anulada: boolean;
    confirmada: boolean;
    tipoComprobante?: number;
    cae?: string;
    caeFchVto?: string;
    nombreContraparte: string;
    saldoPendiente: number;
    detalles: DetalleFacturaItem[];
    viajes: ViajeFacturaItem[];
    recibosImputados: ReciboFacturaItem[];
}

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

export interface ViajeFacturaItem {
    idFacturaViaje: number;
    idViaje: number;
    nroViaje?: string;
    cliente?: string;
    montoViaje: number;
}

export interface ReciboFacturaItem {
    idReciboFactura: number;
    idRecibo: number;
    fechaRecibo: Date;
    importeAplicado: number;
    reciboAnulado: boolean;
}
