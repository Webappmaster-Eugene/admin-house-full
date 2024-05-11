import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { instanceWinstonLogger } from '../logger/winston.logger';
import { ZodValidationPipe } from 'nestjs-zod';
import { ConfigService } from '@nestjs/config';
import { CustomExceptionFilter } from './common/exceptions/custom-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger({
    //   instance: instanceWinstonLogger,
    // }),
  });

  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get<string>('API_PREFIX'));

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Документация для проекта Admin House Андрея Завьялова')
    .setDescription('Документация REST API')
    .setVersion('1.1.0')
    .addTag('current version')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());

  const PORT = Number(config.get<string>('APP_PORT')) || 3001;

  await app.listen(PORT, () => console.log(`Сервер запущен успешно на порту ${PORT}`));
}

bootstrap();
