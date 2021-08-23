export class ParqueaderoCupoModel {
  motos: number;
  carros: number;
  constructor(cupos: ParqueaderoCupoModel) {
    this.motos = cupos.motos;
    this.carros = cupos.carros;
  }
}
