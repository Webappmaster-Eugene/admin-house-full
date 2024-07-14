import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Inject,
  Body,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UploadedFiles,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RolesSetting } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { EUserTypeVariants } from '.prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { okResponseHandler } from 'src/common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from 'src/common/helpers/handlers/error-response.handler';
import { EntityName } from 'src/common/types/entity.enum';
import { KFI } from 'src/common/utils/di';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ILogger } from 'src/common/types/main/logger.interface';
import { IFileStorageController } from 'src/modules/s3-minio/types/minio.controller.interface';
import { ZodSerializerDto } from 'nestjs-zod';
import { IUrlParams, UrlParams } from 'src/common/decorators/url-params.decorator';
import { IFileStorageService } from 'src/modules/s3-minio/types/minio.service.interface';
import { FileStorageGetResponseDto } from 'src/modules/s3-minio/dto/service/get-file.dto';
import { FileStorageCreateResponseDto } from 'src/modules/s3-minio/dto/service/upload-file.dto';
import { FileNameInterceptor } from 'src/common/interceptors/file-name.interceptor';
import { FileStorageControllerCreateRequestDto } from 'src/modules/s3-minio/dto/controller/upload-file.dto';
import { FileStorageEntity } from 'src/modules/s3-minio/entities/minio.entity';
import { FileStorageDeleteResponseDto } from 'src/modules/s3-minio/dto/service/delete-file.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { ProcessExceptionsFilter } from 'src/common/filters/process-exceptions.filter';
import { ErrorCode, ServiceError } from 'src/common/errors';

@ApiTags('Работа с Files')
@Controller('files')
export class S3MinioController implements IFileStorageController {
  constructor(
    @Inject(KFI.S3_MINIO_SERVICE)
    private readonly minioService: IFileStorageService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOperation({ summary: 'Получение File' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FileStorageGetResponseDto)
  @UseFilters(ProcessExceptionsFilter)
  @Get('get/:fileId')
  async getFileByIdEP(
    @Param('fileId') fileId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FileStorageGetResponseDto> {
    try {
      const { ok, data } = await this.minioService.getFileById(fileId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      throw new ServiceError(ErrorCode.InternalServerError, 400, 'error with get file', 'Проблема с получением файла');
      // throw new HttpException({ hello: 'World' }, 400);
      errorResponseHandler(this.logger, error, EntityName.FILE_STORAGE, urlParams);
    }
  }

  //region SWAGGER
  @ApiOperation({ summary: 'Создание File' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'), FileNameInterceptor)
  @ZodSerializerDto(FileStorageCreateResponseDto)
  @Post('upload')
  async uploadFileEP(
    @Body() dto: FileStorageControllerCreateRequestDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 }), new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    file: Express.Multer.File,
    @UrlParams() urlParams: IUrlParams,
  ) {
    try {
      await this.minioService.createBucketIfNotExists();
      const { ok, data } = await this.minioService.uploadFile(dto, file);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FILE_STORAGE, urlParams);
    }
  }

  @Post('upload-many')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFilesManyEP(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  //region SWAGGER
  @ApiOperation({ summary: 'Удаление File' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FileStorageDeleteResponseDto)
  @Delete('delete/:fileId')
  async deleteFileEP(
    @Param('fileId') fileId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FileStorageDeleteResponseDto> {
    try {
      const { ok, data } = await this.minioService.deleteById(fileId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FILE_STORAGE, urlParams);
    }
  }
}
