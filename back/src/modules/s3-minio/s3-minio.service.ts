import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from 'src/common/types/main/config.service.interface';
import { S3MinioController } from 'src/modules/s3-minio/s3-minio.controller';

@Injectable()
export class S3MinioService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService<IConfigService>) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
      port: Number(this.configService.get<number>('MINIO_PORT')),
      // useSSL: this.configService.get<string>('MINIO_USE_SSL') === 'false',
      useSSL: false,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });
    this.bucketName = this.configService.get<string>('MINIO_BUCKET_NAME');
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'start-bucket');
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const fileName = `ah-${this.bucketName}-${Date.now()}-${file.originalname}`;
    await this.minioClient.putObject(this.bucketName, fileName, file.buffer, file.size);
    return fileName;
  }

  async getFileUrl(fileName: string) {
    return await this.minioClient.presignedUrl('GET', this.bucketName, fileName);
  }

  async deleteFile(fileName: string) {
    await this.minioClient.removeObject(this.bucketName, fileName);
  }
}
