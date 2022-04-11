import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('app');
  
  app.useStaticAssets(join(__dirname, '..', 'files'));
  app.useStaticAssets(join(__dirname, '../files/profile-images'));
  app.useStaticAssets(join(__dirname, '../files/product-images'));

  await app.listen(3000);
}
bootstrap();
