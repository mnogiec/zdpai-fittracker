import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './common/filters/GlobalExceptionsFilter.filter';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionsFilter());

  app.enableCors({
    origin: [process.env.WEB_APP_URL],
    allowedHeaders: '*',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 5000);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
