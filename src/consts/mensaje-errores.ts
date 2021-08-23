export const MENSAJE_ERRORES = {
  VEHICULO_NO_PARQUEADO: 'El vehiculo no se encuentra parqueado',
  CAPACIDAD_MAXIMA_ALCANZADA: 'Se ha llegado al maximo de capacidad para el parqueadero',
  VEHICULO_CON_PICO_Y_PLACA: (placa) => `El vehiculo con '${placa}' tiene pico y placa hoy, por lo cual no puede parquear`,
};
