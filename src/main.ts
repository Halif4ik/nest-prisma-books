import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'process';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

 !async function bootstrap() {
  const PORT = process?.env.PORT || 3002;
  const app: INestApplication<any> = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("First test")
    .setDescription("Docs rest api ")
    .setVersion("1.0.0")
    .addTag("Dimon")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/docs", app, document);
  app.setGlobalPrefix('api')
  /*app.useGlobalPipes(new ValidationPipe());*/
  await app.listen(PORT, () => console.log(`Srv started ${PORT}`));
}();
