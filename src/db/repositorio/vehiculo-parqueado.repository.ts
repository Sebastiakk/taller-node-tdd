import { EntityRepository, Repository } from 'typeorm';
import { VehiculoParqueadoEntity } from '../entidades/vehiculo-parqueado.entity';

@EntityRepository(VehiculoParqueadoEntity)
export class VehiculoParqueadoRepository extends Repository<VehiculoParqueadoEntity> {

  obtenerVehiculoPorPlaca(placa: string): Promise<VehiculoParqueadoEntity> {
    return this.findOne({ where: { placa } });
  }

  salidaVehiculo(placa: string) {
    return this.delete({ placa });
  }
}
