import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

!async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const config = new DocumentBuilder()
    .setTitle('Books test application')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('Dmytro Grymach')
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
      'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and authentication headers
  };
  app.enableCors(corsOptions);

  await app.listen(+process.env.PORT);
}();
