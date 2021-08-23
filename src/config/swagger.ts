import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  private readonly puerto = 3000;
  private readonly hostApp = 'localhost';
  private readonly pathSwagger = 'swagger';
  private readonly title = 'Taller node';
  private readonly version = '1.0.0';

  constructor(private readonly app: INestApplication) {
    this.init();
  }

  private init() {
    const document = SwaggerModule.createDocument(this.app, this.documentBuilder);
    SwaggerModule.setup(this.pathSwagger, this.app, document);
    this.log();
  }

  private get documentBuilder() {
    return new DocumentBuilder()
      .setTitle(this.title)
      .setVersion(this.version)
      .build();
  }

  private log(): void {
    Logger.debug(`Swagger activo ${this.hostApp}:${this.puerto}/${this.pathSwagger}/#/`, 'Swagger');
  }
}
