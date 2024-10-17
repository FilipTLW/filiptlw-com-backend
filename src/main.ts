import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap().then();
