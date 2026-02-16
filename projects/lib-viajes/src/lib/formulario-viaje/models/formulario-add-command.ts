export interface FormularioAddCommand{
    cliente: number;
    kilometros: number;
    destinos: number[];
    procendecias: number[];
    montoTotal: number;
    idMoneda: number;
    fechaPartida: Date;
    chofer: number;
    camion: number;
    carga: string;
    kilos: number
}