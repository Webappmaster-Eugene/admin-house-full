import { Inject, Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from 'src/common/types/main/config.service.interface';
import { IFileStorageService } from 'src/modules/s3-minio/types/minio.service.interface';
import { InternalResponse, UniversalInternalResponse } from 'src/common/types/responses/universal-internal-response.interface';
import { KFI } from 'src/common/utils/di';
import { IFileStorageRepository } from 'src/modules/s3-minio/types/minio.repository.interface';
import { FileStorageEntity } from 'src/modules/s3-minio/entities/minio.entity';
import { FileStorageCreateRequestDto } from 'src/modules/s3-minio/dto/service/upload-file.dto';
import { dataInternalExtractor } from 'src/common/helpers/extractors/data-internal.extractor';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

@Injectable()
export class S3MinioService implements IFileStorageService {
  private minioClient: Minio.Client;
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService<IConfigService>,
    @Inject(KFI.S3_MINIO_REPOSITORY)
    private readonly minioRepository: IFileStorageRepository,
  ) {
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

  async createBucketIfNotExists(): Promise<void> {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'start-bucket');
    }
  }

  async uploadFile(dto: FileStorageCreateRequestDto, file: Express.Multer.File): Promise<UniversalInternalResponse<FileStorageEntity>> {
    const fileName = `ah-${this.bucketName}-${Date.now()}-${file.originalname}`;
    const uploadedFile = await this.minioClient.putObject(this.bucketName, fileName, file.buffer, file.size);
    const fileUrl = dataInternalExtractor(await this.getFileUrl(fileName));
    const uploadedFileFromDb = await this.minioRepository.uploadFile(dto, fileName, fileUrl);
    return new InternalResponse(uploadedFileFromDb);
  }

  async getFileById(fileId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<FileStorageEntity>> {
    const findedFile = await this.minioRepository.getFile(fileId);
    return new InternalResponse(findedFile);
  }

  async getFileUrl(fileName: string): Promise<UniversalInternalResponse<string>> {
    const fileUrl = await this.minioClient.presignedUrl('GET', this.bucketName, fileName);
    return new InternalResponse(fileUrl);
  }

  async deleteById(fileId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<FileStorageEntity>> {
    const deletedFile = await this.minioRepository.getFile(fileId);
    await this.minioClient.removeObject(this.bucketName, deletedFile.nameFile);
    return new InternalResponse(deletedFile);
  }
}
