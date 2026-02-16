import { FormularioAddCommand } from "../models/formulario-add-command"
import { FormularioDataViaje } from "../models/formulario-data"

export const MapToAltaModel = (data: FormularioDataViaje): FormularioAddCommand => {
    return {
    cliente: data.datosCliente.idCliente,
    kilometros: data.datosPrincipales.kilometros,
    destinos: data.datosDestino,
    procendecias: data.datosProcedencias,
    montoTotal: data.datosPrincipales.montoTotal,
    idMoneda: data.datosPrincipales.idMoneda,
    fechaPartida: data.datosPrincipales.fechaPartida,
    chofer: data.datosChofer.idChofer,
    camion: data.datosCamion.idCamion,
    carga: data.datosPrincipales.carga,
    kilos: data.datosPrincipales.kilos
    }
}