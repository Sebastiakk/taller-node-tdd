import { Test, TestingModule } from '@nestjs/testing';
import { ParqueaderoService } from './parqueadero.service';
import { ParqueaderoRepository } from '../../db/repositorio/parqueadero.repository';
import { VehiculoParqueadoRepository } from '../../db/repositorio/vehiculo-parqueado.repository';
import { ParqueaderoCupoModel } from '../../modelos/parqueadero-cupo.model';

describe('ParqueaderoService', () => {
  let service: ParqueaderoService;
  let parqueaderoRepository: ParqueaderoRepository;
  let vehiculoParqueadoRepository: VehiculoParqueadoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParqueaderoService,
        {
          provide: ParqueaderoRepository,
          useValue: {
            inicializarParqueadero: () => jest.fn(),
            obtenerInformacionParqueo: jest.fn().mockReturnValue(Promise.resolve({
              maxCupos: {
                motos: 10,
                carros: 20,
              },
              cuposDisponibles: {},
              vehiculoParqueado: [],
            })),
          },
        },
        VehiculoParqueadoRepository,
      ],
    }).compile();
    service = module.get(ParqueaderoService);
    parqueaderoRepository = module.get(ParqueaderoRepository);
    vehiculoParqueadoRepository = module.get(VehiculoParqueadoRepository);
  });


  it('onModuleInit => Debe crear el parqueadero por defecto', () => {
    //  Arrange
    // service.parqueaderoPorDefecto = () => jest.fn().call(null);
    const spyParqueaderoPorDefecto = jest.spyOn(service, 'parqueaderoPorDefecto');
    //  Act
    service.onModuleInit();
    //  Assert
    expect(spyParqueaderoPorDefecto).toBeCalled();


  });
  it('obtenerParqueadero => debe retornar un parqueadero', async () => {
    const cantidadVehiculosParqueados = 0;
    const cupoParqueadero = new ParqueaderoCupoModel({ motos: 10, carros: 20 });
    const spyObtenerInformacionParqueo = jest.spyOn(parqueaderoRepository, 'obtenerInformacionParqueo');
    service.cuposDisponibles = () => jest.fn().call(cupoParqueadero);

    const result = await service.obtenerParqueadero();

    expect(spyObtenerInformacionParqueo).toBeCalled();
    expect(cupoParqueadero.carros).toEqual(result.maxCupos.carros);
    expect(cupoParqueadero.motos).toEqual(result.maxCupos.motos);
    expect(result.vehiculoParqueado.length).toEqual(cantidadVehiculosParqueados);
  });


});
