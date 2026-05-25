export interface CrearEmitidaConViajeModel {
    idCliente: number;
    viajes: ViajeItemModel[];
    fechaEmision: Date;
    fechaVencimiento?: Date;
    porcentajeIva: number;
    idMoneda: number;
    tipoCambio?: number;
    observaciones?: string;
    detalles: DetalleItemModel[];
}

export interface ViajeItemModel {
    idViaje: number;
    montoViaje: number;
}

export interface DetalleItemModel {
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    porcentajeIva?: number;
}

export interface ViajesPendienteItem {
    idViaje: number;
    nroViaje?: string;
    montoTotal: number;
    razonSocialCliente?: string;
    fechaDescarga?: Date;
}
