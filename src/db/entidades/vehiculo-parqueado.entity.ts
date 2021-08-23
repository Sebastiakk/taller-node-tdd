import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ParqueaderoEntity } from './parqueadero.entity';

@Entity('vehiculo-parqueado')
export class VehiculoParqueadoEntity extends BaseEntity {

  @Column({ nullable: false })
  tipo: string;

  @Column({ unique: true, nullable: false })
  placa: string;

  @Column({ type: 'int' })
  cilindraje: number;


  @ManyToOne(
    () => ParqueaderoEntity,
    i => i.vehiculoParqueado,
  )
  parqueadero: ParqueaderoEntity;
}
