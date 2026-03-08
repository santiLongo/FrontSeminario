export interface ClienteFilterModel {
    estado: ClienteEstadoEnum
}

enum ClienteEstadoEnum {
    Activos = 1,
    Inactivos = 2,
    Todos = 3
} 