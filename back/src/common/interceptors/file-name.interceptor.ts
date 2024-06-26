import { CallHandler, ExecutionContext, Inject, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from 'src/common/types/main/config.service.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ILogger } from 'src/common/types/main/logger.interface';
import { FileStorageCreateRequestDto } from 'src/modules/s3-minio/dto/service/upload-file.dto';
import { v4 as uuid_generate } from 'uuid';

export class FileNameInterceptor implements NestInterceptor {
  constructor(
    private configService: ConfigService<IConfigService>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const body: FileStorageCreateRequestDto = request.body;
    try {
      body.nameFile = body.nameFile ? body.nameFile : uuid_generate();
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }

    return handler.handle();
  }
}
