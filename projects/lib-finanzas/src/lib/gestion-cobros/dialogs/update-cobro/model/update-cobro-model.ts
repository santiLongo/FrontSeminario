export class UpdateCobroModel {
    idCobro: number; 
    monto: number;
    idMoneda: number;
    tipoCambio: number;
    idFormaPago: number;
    datosCheque?: DatosCheques
}

export interface DatosCheques {
    idCheque?: number;
    nroCheque?: number;
    cuitEmisor?: number;
    idBanco?: number;
    fechaCobro?: Date;
}
