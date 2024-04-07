import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { instance } from '../logger/winston.logger';
import { ZodValidationPipe } from 'nestjs-zod';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Документация для проекта Admin House Андрея Завьялова')
    .setDescription('Документация REST API')
    .setVersion('1.1.0')
    .addTag('current version')
    .build();

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get<string>('API_PREFIX'));

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //   }),
  // );
  app.useGlobalPipes(new ZodValidationPipe());

  // app.useGlobalFilters(new NotFoundExceptionFilter());

  const PORT = Number(config.get<string>('APP_PORT')) || 3001;

  await app.listen(PORT, () =>
    console.log(`Сервер запущен успешно на порту ${PORT}`),
  );
}

bootstrap();
