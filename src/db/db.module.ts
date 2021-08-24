import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParqueaderoRepository } from './repositorio/parqueadero.repository';
import { VehiculoParqueadoRepository } from './repositorio/vehiculo-parqueado.repository';
import { ParqueaderoEntity } from './entidades/parqueadero.entity';
import { ParqueaderoCuposEntity } from './entidades/parqueadero-cupos.entity';
import { VehiculoParqueadoEntity } from './entidades/vehiculo-parqueado.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      logging: false,
      entities: [
        ParqueaderoEntity,
        ParqueaderoCuposEntity,
        VehiculoParqueadoEntity
      ],
    }),
    TypeOrmModule.forFeature([
      ParqueaderoRepository,
      VehiculoParqueadoRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {
}
