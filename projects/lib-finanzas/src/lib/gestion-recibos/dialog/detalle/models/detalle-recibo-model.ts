export interface GetReciboResponse {
    idRecibo: number;
    tipo: number;
    fechaRecibo: Date;
    montoTotal: number;
    idMoneda: number;
    tipoCambio?: number;
    idCliente?: number;
    idProveedor?: number;
    idTaller?: number;
    nombreContraparte: string;
    observaciones?: string;
    anulado: boolean;
    formasDePago: GetReciboFormaPagoResponse[];
    facturasImputadas: GetReciboFacturaResponse[];
}

export interface GetReciboFormaPagoResponse {
    idReciboFormaPago: number;
    idFormaPago: number;
    descripcionFormaPago: string;
    monto: number;
    idPagoCheque?: number;
    nroCheque?: string;
    cuitEmisor?: string;
    idBanco?: number;
    fechaCobro?: Date;
    esPropio?: boolean;
}

export interface GetReciboFacturaResponse {
    idReciboFactura: number;
    idFactura: number;
    puntoVenta: number;
    numero: number;
    fechaEmision: Date;
    importeAplicado: number;
}
