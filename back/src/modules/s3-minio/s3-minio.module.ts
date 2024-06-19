import { Module } from '@nestjs/common';
import { S3MinioController } from 'src/modules/s3-minio/s3-minio.controller';
import { S3MinioService } from 'src/modules/s3-minio/s3-minio.service';

@Module({
  providers: [S3MinioService],
  controllers: [S3MinioController],
  imports: [],
  exports: [S3MinioService],
})
export class S3MinioModule {}
