import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { instance } from '../logger/winston.logger';
import { NotFoundExceptionFilter } from './lib/exceptions/notfound.exception';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Документация для проекта Admin House Андрея Завьялова')
    .setDescription('Документация REST API')
    .setVersion('1.1.0')
    .addTag('current version')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // app.useGlobalFilters(new NotFoundExceptionFilter());

  await app.listen(PORT, () =>
    console.log(`Сервер запущен успешно на порту ${PORT}`),
  );
}

bootstrap();
