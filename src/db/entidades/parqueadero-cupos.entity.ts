import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity('parqueadero-cupos')
export class ParqueaderoCuposEntity extends BaseEntity {

  @Column({ type: 'int' })
  moto: number;

  @Column({ type: 'int' })
  carro: number;
}
