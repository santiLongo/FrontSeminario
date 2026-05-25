export enum ReciboTipoEnum {
    Cobro = 1,
    Pago = 2
}

export interface ReciboFilterModel {
    tipoRecibo?: ReciboTipoEnum;
    idCliente?: number;
    idProveedor?: number;
    idTaller?: number;
    anulado?: boolean;
    fechaDesde?: Date;
    fechaHasta?: Date;
}
