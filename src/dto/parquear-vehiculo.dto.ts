import { ApiProperty } from '@nestjs/swagger';
import { TipoVehiculoEnum } from '../modelos/enums/tipo-vehiculoo.enum';

export class ParquearVehiculoDto {
  @ApiProperty({ default: `ABC-137` })
  placa: string;

  @ApiProperty({ enum: ['Carro', 'Moto'] })
  tipo: TipoVehiculoEnum;

  @ApiProperty({ minimum: 0 })
  cilindraje: number;

}
