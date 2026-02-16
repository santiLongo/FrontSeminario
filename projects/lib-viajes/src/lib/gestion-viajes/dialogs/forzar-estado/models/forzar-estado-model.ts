export interface ForzarEstadoModel{
    idViaje: number;
    estado: EstadoViaje,
    observacion: string;
    seguridad: boolean;
}

enum EstadoViaje {
    EnViaje = 1,
    Finalizado = 2,
    Suspendido = 3,
    Cobrado = 4,
}