import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

!async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const config = new DocumentBuilder()
    .setTitle('First test')
    .setDescription('Docs rest api ')
    .setVersion('1.0.0')
    .addTag('Dimon')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  // Define the CORS options
  const corsOptions = {
    origin: [
      'http://grymachtest.ddns.net',
      'https://www.google.com',
      'http://91.214.247.147',
      'http://127.0.0.1:3002',
      'http://localhost:3002',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and authentication headers
  };
  app.enableCors(corsOptions);

  app.setGlobalPrefix('api');

  await app.listen(+process.env.PORT || 3002);
}();
