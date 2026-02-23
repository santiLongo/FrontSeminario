export interface UpsertProveedorModel{
    idProveedor?: number;
    razonSocial: string;
    direccion: string;
    cuit: number;
    responsable: string;
    mail: string;
    codigoPostal: string;
    idLocalidad: number;
    especialidades: UpsertEspecialidadProveedor[];
}

export interface UpsertEspecialidadProveedor {
    idEspecialidad: number;
    descripcion: string;
}