import { Injectable, OnModuleInit } from '@nestjs/common';
import { ParqueaderoRepository } from '../../db/repositorio/parqueadero.repository';
import { PICO_Y_PLACA_HOY } from '../../consts/pico-y-placa-hoy';
import { ParquearVehiculoDto } from '../../dto/parquear-vehiculo.dto';
import { VehiculoModel } from '../../modelos/vehiculo.model';
import { ParqueaderoModel } from '../../modelos/parqueadero.model';
import { ParqueaderoCupoModel } from '../../modelos/parqueadero-cupo.model';
import { ParqueaderoEntity } from '../../db/entidades/parqueadero.entity';
import { VehiculoParqueadoRepository } from '../../db/repositorio/vehiculo-parqueado.repository';
import { TipoVehiculoEnum } from '../../modelos/enums/tipo-vehiculoo.enum';
import { ValorParqueoEnum } from '../../modelos/enums/valor-parqueo.enum';
import { MENSAJE_ERRORES } from '../../consts/mensaje-errores';

@Injectable()
export class ParqueaderoService implements OnModuleInit {
  constructor(
    private _parqueaderoRepository: ParqueaderoRepository,
    private _vehiculoParqueadoRepository: VehiculoParqueadoRepository,
  ) {
  }

  onModuleInit(): void {
    this.parqueaderoPorDefecto();
  }

  public obtenerParqueadero() {
    return this._parqueaderoRepository.obtenerInformacionParqueo()
      .then((i: any) => new ParqueaderoModel({
        ...i,
        cuposDisponibles: this.cuposDisponibles(i),
      }));
  }

  public async parquearVehiculo(vehiculo: ParquearVehiculoDto) {
    this.validarPicoYPlaca(vehiculo.placa);
    await this.validarCupos();
    const vehiculoModel = new VehiculoModel(vehiculo.tipo, vehiculo.cilindraje, vehiculo.placa);
    return this._parqueaderoRepository.parquearVehiculo(vehiculoModel);
  }

  public async salidaVehiculo(placa: string, horas: number) {
    let totalCobrar = 0;
    const vehiculo = await this._vehiculoParqueadoRepository.obtenerVehiculoPorPlaca(placa);
    if (!vehiculo) {
      throw new Error(MENSAJE_ERRORES.VEHICULO_NO_PARQUEADO);
    }
    switch (vehiculo.tipo) {
      case TipoVehiculoEnum.MOTO:
        totalCobrar = horas * ValorParqueoEnum.MOTO_HORA;
        if (vehiculo.cilindraje === 500) {
          totalCobrar += ValorParqueoEnum.MOTO_CILINDRAJE_MAYOR_500;
        }
        break;
      case TipoVehiculoEnum.CARRO:
        totalCobrar = horas * ValorParqueoEnum.CARRO_HORA;
        break;
    }
    await this._vehiculoParqueadoRepository.salidaVehiculo(placa);
    return { totalCobrar };
  }

  private cuposDisponibles(parqueadero: ParqueaderoEntity): ParqueaderoCupoModel {
    const motos = (parqueadero.maxCupos.moto - parqueadero.vehiculoParqueado.filter(i => i.tipo === 'Moto').length);
    const carros = (parqueadero.maxCupos.carro - parqueadero.vehiculoParqueado.filter(i => i.tipo === 'Carro').length);
    return new ParqueaderoCupoModel({ motos, carros },
    );
  }

  private async parqueaderoPorDefecto(): Promise<void> {
    await this._parqueaderoRepository.inicializarParqueadero();
  }

  private validarPicoYPlaca(placa: string): void {
    const ultimoDigitoPlaca = placa.substr(-1);
    if (Number(ultimoDigitoPlaca) === PICO_Y_PLACA_HOY) {
      throw new Error(MENSAJE_ERRORES.VEHICULO_CON_PICO_Y_PLACA(placa));
    }
  }

  private async validarCupos(): Promise<void> {
    const parqueadero = await this.obtenerParqueadero();
    if (
      parqueadero.cuposDisponibles.motos === 0 ||
      parqueadero.cuposDisponibles.carros === 0) {
      throw new Error(MENSAJE_ERRORES.CAPACIDAD_MAXIMA_ALCANZADA);
    }
  }
}
