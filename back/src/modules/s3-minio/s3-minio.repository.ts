import { Inject, Injectable } from '@nestjs/common';
import { KFI } from 'src/common/utils/di';
import { IPrismaService } from 'src/common/types/main/prisma.interface';
import { existenceEntityHandler } from 'src/common/helpers/handlers/existance-entity-handler';
import { EntityName } from 'src/common/types/entity.enum';
import { errorRepositoryHandler } from 'src/common/helpers/handlers/error-repository.handler';
import { IFileStorageRepository } from 'src/modules/s3-minio/types/minio.repository.interface';
import { FileStorageCreateRequestDto } from 'src/modules/s3-minio/dto/service/upload-file.dto';
import { FileStorageEntity } from 'src/modules/s3-minio/entities/minio.entity';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

@Injectable()
export class S3MinioRepository implements IFileStorageRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async uploadFile(dto: FileStorageCreateRequestDto, fileName: any, fileUrl: string): Promise<FileStorageEntity> {
    try {
      const newFileInfo = await this.databaseService.fileStorage.create({
        data: { comment: dto?.comment, link: fileUrl, nameFile: fileName },
      });
      return existenceEntityHandler(newFileInfo, FileStorageEntity, EntityName.FILE_STORAGE) as FileStorageEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getFile(fileId: EntityUrlParamCommand.RequestUuidParam): Promise<FileStorageEntity> {
    try {
      const findedFile = await this.databaseService.fileStorage.findUnique({
        where: {
          uuid: fileId,
        },
      });

      return existenceEntityHandler(findedFile, FileStorageEntity, EntityName.FILE_STORAGE) as FileStorageEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteFile(fileId: EntityUrlParamCommand.RequestUuidParam): Promise<FileStorageEntity> {
    try {
      const deletedFile = await this.databaseService.fileStorage.delete({
        where: {
          uuid: fileId,
        },
      });

      return existenceEntityHandler(deletedFile, FileStorageEntity, EntityName.FILE_STORAGE) as FileStorageEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}