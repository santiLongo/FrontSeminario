import { FormularioAddCommand } from "../models/formulario-add-command"
import { FormularioDataViaje } from "../models/formulario-data"
import { FormularioUpdateCommand } from "../models/formulario-update-command"

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

export const MapToUpdateModel = (data: FormularioDataViaje): FormularioUpdateCommand => {
    return {
    idViaje: 0,
    kilometros: data.datosPrincipales.kilometros,
    destinos: data.datosDestino,
    procendecias: data.datosProcedencias,
    montoTotal: data.datosPrincipales.montoTotal,
    chofer: data.datosChofer.idChofer,
    camion: data.datosCamion.idCamion,
    carga: data.datosPrincipales.carga,
    kilos: data.datosPrincipales.kilos
    }
}