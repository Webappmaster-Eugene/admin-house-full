import { Module } from '@nestjs/common';
import { S3MinioController } from '../../modules/s3-minio/s3-minio.controller';
import { KFI } from '../../common/utils/di';
import { StatusResourceRepository } from '../../modules/status-resource/status-resource.repository';
import { StatusResourceService } from '../../modules/status-resource/status-resource.service';
import { S3MinioService } from '../../modules/s3-minio/s3-minio.service';
import { S3MinioRepository } from '../../modules/s3-minio/s3-minio.repository';

@Module({
  providers: [
    {
      provide: KFI.S3_MINIO_REPOSITORY,
      useClass: S3MinioRepository,
    },
    {
      provide: KFI.S3_MINIO_SERVICE,
      useClass: S3MinioService,
    },
  ],
  controllers: [S3MinioController],
  imports: [],
  exports: [KFI.S3_MINIO_SERVICE],
})
export class S3MinioModule {}
