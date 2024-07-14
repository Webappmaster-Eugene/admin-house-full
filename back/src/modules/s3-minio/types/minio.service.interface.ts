import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { FileStorageEntity } from 'src/modules/s3-minio/entities/minio.entity';
import { FileStorageCreateRequestDto } from 'src/modules/s3-minio/dto/service/upload-file.dto';

export interface IFileStorageService {
  createBucketIfNotExists: () => Promise<void>;
  getFileById: (fileId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<FileStorageEntity>>;
  getFileUrl: (fileName: string) => Promise<UniversalInternalResponse<string>>;
  uploadFile: (dto: FileStorageCreateRequestDto, file: Express.Multer.File) => Promise<UniversalInternalResponse<FileStorageEntity>>;
  deleteById: (fileId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<FileStorageEntity>>;
}
