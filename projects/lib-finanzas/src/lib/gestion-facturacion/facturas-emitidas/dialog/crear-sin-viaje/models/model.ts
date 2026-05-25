export interface CrearEmitidaSinViajeModel {
    idCliente: number;
    fechaEmision: Date;
    fechaVencimiento?: Date;
    porcentajeIva: number;
    idMoneda: number;
    tipoCambio?: number;
    observaciones?: string;
    detalles: DetalleItemModel[];
}

export interface DetalleItemModel {
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    porcentajeIva?: number;
}
