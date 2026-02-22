export interface UpsertTallerModel{
    idTaller?: number;
    nombre: string;
    direccion: string;
    cuit: number;
    telefono: number;
    responsable: string;
    mail: string;
    codigoPostal: string;
    idLocalidad: number;
    especialidades: UpsertEspecialidadTaller[];
}

export interface UpsertEspecialidadTaller {
    idEspecialidad: number;
    descripcion: string;
}