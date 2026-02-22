export class InformarCobroModel {
    idViaje: number;
    fechaRecibido: Date;
    monto: number;
    idMoneda: number;
    tipoCambio: number;
    idFormaPago: number;
    datosCheque?: DatosCheques
}

export interface DatosCheques {
    nroCheque: number;
    cuitEmisor: number;
    idBanco: number;
    fechaCobro: Date;
}
