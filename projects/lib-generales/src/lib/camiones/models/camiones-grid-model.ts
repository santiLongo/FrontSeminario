export interface CamionesGridModel {
    id: number;
    patente: string;
    marca: string;
    modelo: string;
    nroChasis: string;
    nroMotor: string;
    tipoCamion: string;
    fechaAlta: Date;
    fechaBaja: Date;
    ultimoViaje: Date;
    ultimoMantenimiento: Date;
}