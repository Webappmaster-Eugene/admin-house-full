import { FileStorageCreateRequestDto, FileStorageCreateResponseDto } from '../../../modules/s3-minio/dto/service/upload-file.dto';
import { FileStorageGetResponseDto } from '../../../modules/s3-minio/dto/service/get-file.dto';
import { FileStorageDeleteResponseDto } from '../../../modules/s3-minio/dto/service/delete-file.dto';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { EntityUrlParamCommand } from 'libs/contracts';

export interface IFileStorageController {
  getFileByIdEP: (fileId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<FileStorageGetResponseDto>;
  uploadFileEP: (
    dto: FileStorageCreateRequestDto,
    file: Express.Multer.File,
    urlParams: IUrlParams,
  ) => Promise<FileStorageCreateResponseDto>;
  deleteFileEP: (fileId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<FileStorageDeleteResponseDto>;
}
