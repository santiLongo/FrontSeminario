export interface ViajesPendienteGridModel {
    idViaje: number;
    nroViaje?: number;
    fechaPartida?: string;
    fechaDescarga?: string;
    estado: number;
    montoTotal: number;
    idCliente: number;
    razonSocialCliente: string;
    nombreChofer?: string;
    patenteCamion?: string;
}
