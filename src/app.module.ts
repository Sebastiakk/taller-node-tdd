import { Module } from '@nestjs/common';
import { ParqueaderoService } from './servicios/parqueadero/parqueadero.service';
import { DbModule } from './db/db.module';
import { ParqueaderoController } from './apis/parqueadero.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './config/http-exception.filter';

@Module({
  imports: [
    DbModule,
  ],
  controllers: [ParqueaderoController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ParqueaderoService],
})
export class AppModule {
}
