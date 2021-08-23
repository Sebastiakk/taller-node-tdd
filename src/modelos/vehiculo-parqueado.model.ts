import { VehiculoModel } from './vehiculo.model';

export class VehiculoParqueadoModel {
  horasParqueadas: number;
  totalACobrar: number;
  vehiculo: VehiculoModel;

  constructor(vehiculoParqueado: VehiculoParqueadoModel) {
    this.horasParqueadas = vehiculoParqueado.horasParqueadas;
    this.totalACobrar = vehiculoParqueado.totalACobrar;
    this.vehiculo = vehiculoParqueado.vehiculo;
  }
}
