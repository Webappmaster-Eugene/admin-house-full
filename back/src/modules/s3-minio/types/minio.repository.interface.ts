import { EntityUrlParamCommand } from 'libs/contracts';
import { FileStorageEntity } from 'src/modules/s3-minio/entities/minio.entity';
import { FileStorageCreateRequestDto } from 'src/modules/s3-minio/dto/service/upload-file.dto';

export interface IFileStorageRepository {
  getFile: (fileId: EntityUrlParamCommand.RequestUuidParam) => Promise<FileStorageEntity>;
  uploadFile: (dto: FileStorageCreateRequestDto, fileName: string, fileUrl: string) => Promise<FileStorageEntity>;
  deleteFile: (fileId: EntityUrlParamCommand.RequestUuidParam) => Promise<FileStorageEntity>;
}
