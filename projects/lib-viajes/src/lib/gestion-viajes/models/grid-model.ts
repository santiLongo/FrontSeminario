export interface GestionViajesGridModel {
    idViaje: number;
    nroViaje: string;
    cliente: string;
    patente: string;
    carga: string;
    chofer: string;
    kilometros: number;
    montoTotal: number;
    cobrado: number;
    estado: string;
    fechaPartida: Date;
    fechaDescarga: Date;
    userName: string;
    userDateTime: Date;
}