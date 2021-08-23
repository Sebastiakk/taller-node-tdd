import { BaseEntity } from './base.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ParqueaderoCuposEntity } from './parqueadero-cupos.entity';
import { VehiculoParqueadoEntity } from './vehiculo-parqueado.entity';

@Entity('parqueadero')
export class ParqueaderoEntity extends BaseEntity {

  @OneToOne(
    () => ParqueaderoCuposEntity,
    i => i.id,
    { cascade: true },
  )
  @JoinColumn()
  maxCupos: ParqueaderoCuposEntity;


  @OneToMany(
    () => VehiculoParqueadoEntity,
    i => i.parqueadero,
    { cascade: true, onDelete: 'CASCADE' },
  )
  vehiculoParqueado: VehiculoParqueadoEntity[];
}
