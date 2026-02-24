export interface FormularioDataViaje {
  datosPrincipales: DatosPrincipalesViaje;
  datosChofer: DatosChoferViaje;
  datosCliente: DatosClienteViaje;
  datosCamion: DatosCamionViaje;
  datosDestino: number[];
  datosProcedencias: number[];
}

export interface FormularioGetDataViaje {
  datosPrincipales: DatosPrincipalesViaje;
  datosChofer: DatosChoferViaje;
  datosCliente: DatosClienteViaje;
  datosCamion: DatosCamionViaje;
  datosDestino: DatosUbicacion[];
  datosProcedencias: DatosUbicacion[];
}

// =======================
// PRINCIPALES
// =======================

export interface DatosPrincipalesViaje {
  idViaje: number;
  kilometros: number;
  montoTotal: number;
  precioKm: number;
  idMoneda: number;
  moneda: string;

  fechaPartida: Date;      // ISO date
  fechaDescarga: Date;

  carga: string;
  kilos: number;

  userName: string;
  userAlta: string;
  userDateTime: Date;
  fechaAlta: Date;
}

// =======================
// CHOFER
// =======================

export interface DatosChoferViaje {
  idChofer: number;
  nombreCompleto: string;
  nroRegistro: number;
  dni: number;
}

// =======================
// CLIENTE
// =======================

export interface DatosClienteViaje {
  idCliente: number;
  cuit: string;
  razonSocial: string;
}

// =======================
// CAMION
// =======================

export interface DatosCamionViaje {
  idCamion: number;
  patente: string;
  ultimoMantenimiento: Date;
  tipoCamion: string;
  idSemi: number;
  ultimoMantenimientoSemi: Date;
}

// =======================
// UBICACIONES (Destino / Procedencia)
// =======================

export interface DatosUbicacion {
  idDestino: number;
  idProcedencia: number;
  localidad: string;
}
