export interface DetalleUpdateModel {
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    porcentajeIva: number;
}

export interface UpdateRecibidaModel {
    idProveedor?: number;
    idTaller?: number;
    fechaEmision: Date;
    fechaVencimiento?: Date;
    porcentajeIva: number;
    idMoneda: number;
    tipoCambio?: number;
    observaciones?: string;
    detalles: DetalleUpdateModel[];
}
