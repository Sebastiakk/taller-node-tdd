import { defineFeature } from 'jest-cucumber';
import { CUCUMBER_FEATURES } from '../features';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

defineFeature(CUCUMBER_FEATURES.INICIO_SISTEMA, (test) => {


  test('La aplicacion se esta iniciando',

    ({ given, when, then }) => {
      let app: INestApplication;
      beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
      });


      then(
        /^debe tener un parqueadero vacio sin (.*) vehiculos estacionados$/,
        (vehiculosParqueados: string) => {
          return request(app.getHttpServer()).get('/cupos')
            .expect(200)
            .expect(res => {
              expect(res.body.vehiculoParqueado.length.toString()).toEqual(vehiculosParqueados);
            });
        });

      then(
        /^el cupo para carro debe ser (.*) y para moto (.*)$/,
        (cupoCarro: string, cupoMoto: string) => {
          return request(app.getHttpServer())
            .get('/cupos')
            .expect(200)
            .expect(res => {
              expect(res.body.maxCupos.moto.toString()).toEqual(cupoMoto);
              expect(res.body.maxCupos.carro.toString()).toEqual(cupoCarro);
            });
        });
    });
});
