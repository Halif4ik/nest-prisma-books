import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'process';

async function bootstrap() {
  const PORT = process?.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  /*app.setGlobalPrefix('api')*/
  await app.listen(PORT, () => console.log(`Srv started ${PORT}`));
}
bootstrap();
