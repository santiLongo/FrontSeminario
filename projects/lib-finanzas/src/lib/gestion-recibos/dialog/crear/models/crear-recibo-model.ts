export interface CrearReciboModel {
    tipoRecibo: number;
    fechaRecibo: Date;
    idCliente?: number;
    idProveedor?: number;
    idTaller?: number;
    idMoneda: number;
    tipoCambio?: number;
    observaciones?: string;
    formasDePago: CrearReciboFormaPagoModel[];
    imputaciones?: CrearReciboImputacionModel[];
}

export interface CrearReciboFormaPagoModel {
    idFormaPago: number;
    monto: number;
    datosCheque?: CrearReciboChequeModel;
}

export interface CrearReciboChequeModel {
    nroCheque: string;
    cuitEmisor: string;
    idBanco: number;
    fechaCobro: Date;
    esPropio: boolean;
}

export interface CrearReciboImputacionModel {
    idFactura: number;
    importeAplicado: number;
}
