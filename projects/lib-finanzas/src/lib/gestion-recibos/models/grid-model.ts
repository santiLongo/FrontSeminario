export interface ReciboGridModel {
    idRecibo: number;
    tipo: number;
    fechaRecibo: Date;
    montoTotal: number;
    anulado: boolean;
    nombreContraparte: string;
    cantFacturasImputadas: number;
}
