import { EntityRepository, Repository } from 'typeorm';
import { ParqueaderoEntity } from '../entidades/parqueadero.entity';
import { ParqueaderoCuposEntity } from '../entidades/parqueadero-cupos.entity';
import { Logger } from '@nestjs/common';
import { VehiculoModel } from '../../modelos/vehiculo.model';
import { VehiculoParqueadoEntity } from '../entidades/vehiculo-parqueado.entity';

@EntityRepository(ParqueaderoEntity)
export class ParqueaderoRepository extends Repository<ParqueaderoEntity> {
  async inicializarParqueadero() {
    const parqueadero = new ParqueaderoEntity();
    parqueadero.maxCupos = new ParqueaderoCuposEntity();
    parqueadero.maxCupos.moto = 10;
    parqueadero.maxCupos.carro = 20;
    await this.save(parqueadero);
    Logger.debug('Parqueadero inicializado', ParqueaderoEntity.name);
  }

  obtenerInformacionParqueo(): Promise<ParqueaderoEntity> {
    return this.findOne({
      relations: ['maxCupos', 'vehiculoParqueado'],
    });
  }

  async parquearVehiculo(vehiculo: VehiculoModel): Promise<boolean> {
    const parqueadero = await this.obtenerInformacionParqueo();
    const vehiculoParqueadoEntity = new VehiculoParqueadoEntity();
    vehiculoParqueadoEntity.placa = vehiculo.placa;
    vehiculoParqueadoEntity.cilindraje = vehiculo.cilindraje;
    vehiculoParqueadoEntity.tipo = vehiculo.tipo;
    parqueadero.vehiculoParqueado.push(vehiculoParqueadoEntity);
    return this.save(parqueadero).then(i => !!i);
  }

}
