import { TipoVehiculoEnum } from './enums/tipo-vehiculoo.enum';

export class VehiculoModel {


  constructor(
    public readonly tipo: TipoVehiculoEnum,
    public readonly cilindraje: number,
    public readonly placa: string,
  ) {
    this.validarPicoYPlaca(placa);
  }

  private validarPicoYPlaca(placa: string): void {
    const ultimoDigitoPlaca = placa.substr(-1);
    if (isNaN(Number(ultimoDigitoPlaca))) {
      throw new Error(`la placa "${placa}" no es valida, ésta debe terminar en un numero`);
    }
  }
}
