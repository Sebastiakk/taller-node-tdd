import { Test, TestingModule } from '@nestjs/testing';
import { ParqueaderoService } from './parqueadero.service';

describe('ParqueaderoService', () => {
  let service: ParqueaderoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParqueaderoService],
    }).compile();

    service = module.get<ParqueaderoService>(ParqueaderoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
