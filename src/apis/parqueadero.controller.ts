import { ParqueaderoService } from '../servicios/parqueadero/parqueadero.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParquearVehiculoDto } from '../dto/parquear-vehiculo.dto';

@ApiTags('Parqueadero')
@Controller()
export class ParqueaderoController {
  constructor(private readonly _parqueaderoService: ParqueaderoService) {
  }

  @Get('/cupos')
  @ApiOperation({ summary: 'Obtener los cupos disponibles' })
  public obtenerParqueadero() {
    return this._parqueaderoService.obtenerParqueadero();
  }

  @Post('/parquear')
  @ApiOperation({ summary: 'Permite parquear un vehiculo' })
  public parquearVehiculo(@Body() vehiculo: ParquearVehiculoDto) {
    return this._parqueaderoService.parquearVehiculo(vehiculo);
  }

  @Put('/salida-vehiculo/:placa/:horas')
  @ApiOperation({ summary: 'Permite la salida de un vehiculo' })
  public salidaVehiculo(
    @Param('placa') placa: string,
    @Param('horas') horas: number,
  ) {
    return this._parqueaderoService.salidaVehiculo(placa,horas);
  }
}
