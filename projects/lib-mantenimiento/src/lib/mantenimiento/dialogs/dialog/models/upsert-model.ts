export interface UpsertMantenimientoModel{
    idMantenimiento?: number;
    titulo: string;
    idCamion: number;
    fechaEntrada: Date;
    idTaller: number;
    tareas: UpsertTareas[];
}

export interface UpsertTareas {
    idTarea?: number;
    descripcion: string;
    costo: number;
}