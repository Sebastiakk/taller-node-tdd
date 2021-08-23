import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParqueaderoRepository } from './repositorio/parqueadero.repository';
import { VehiculoParqueadoRepository } from './repositorio/vehiculo-parqueado.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      ParqueaderoRepository,
      VehiculoParqueadoRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {
}
