import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { ConfigService } from '@nestjs/config';
import { CustomExceptionFilter } from './common/exceptions/custom-exception-filter';
import { VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { IConfigService } from './common/types/main/config.service.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger({
    //   instance: instanceWinstonLogger,
    // }),
    bufferLogs: true,
  });

  const config = app.get(ConfigService<IConfigService>);
  app.use(cookieParser());
  app.setGlobalPrefix(config.get<string>('API_PREFIX'));

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // origin: true,
    // methods: 'all',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: config.get<string>('API_VERSION'),
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Документация для проекта Admin House')
    .setVersion(config.get<string>('API_VERSION'))
    .setDescription('Документация REST API')
    .setVersion('1.2.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());

  const PORT = Number(config.get<string>('APP_PORT')) || 3001;

  await app.listen(PORT, () => console.log(`Сервер запущен успешно на порту ${PORT}`));
}

bootstrap();
