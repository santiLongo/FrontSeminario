export interface ConfirmarFacturaModel {
    tipoComprobante?: number;
    cae?: string;
    caeFchVto?: string; // formato YYYYMMDD
}

// Alias para mantener compatibilidad con el http service de recibidas
export type ConfirmarRecibidaModel = ConfirmarFacturaModel;
