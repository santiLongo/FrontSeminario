export interface DetalleItemModel {
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    porcentajeIva: number;
}

export interface CrearRecibidaModel {
    idProveedor?: number;
    idTaller?: number;
    puntoVenta: number;
    numero: number;
    fechaEmision: Date;
    fechaVencimiento?: Date;
    porcentajeIva: number;
    idMoneda: number;
    tipoCambio?: number;
    idsMantenimiento?: number[];
    observaciones?: string;
    detalles: DetalleItemModel[];
}
