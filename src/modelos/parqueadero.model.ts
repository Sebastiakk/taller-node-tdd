import { ParqueaderoCupoModel } from './parqueadero-cupo.model';
import { VehiculoParqueadoModel } from './vehiculo-parqueado.model';

export class ParqueaderoModel {
  maxCupos: ParqueaderoCupoModel;
  cuposDisponibles: ParqueaderoCupoModel;
  vehiculoParqueado: VehiculoParqueadoModel[];

  constructor(parqueadero: ParqueaderoModel) {
    this.maxCupos = parqueadero.maxCupos;
    this.cuposDisponibles = parqueadero.cuposDisponibles;
    this.vehiculoParqueado = parqueadero.vehiculoParqueado;
  }
}
