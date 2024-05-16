import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IAppInfoRepository } from './types/app-info.repository.interface';
import { AppInfoUpdateRequestDto } from './dto/controller/update-app-info.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { AppInfoEntity } from './entities/app-info.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';

@Injectable()
export class AppInfoRepository implements IAppInfoRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async get(): Promise<AppInfoEntity> {
    try {
      const findedAppInfo = await this.databaseService.appSettings.findFirst();
      return existenceEntityHandler(findedAppInfo, AppInfoEntity, EntityName.APP_INFO) as AppInfoEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async update(appInfoId: EntityUrlParamCommand.RequestUuidParam, dto: AppInfoUpdateRequestDto): Promise<AppInfoEntity> {
    try {
      const { name, description, currency, status, language, comment } = dto;

      const updatedAppInfo = await this.databaseService.appSettings.update({
        where: {
          uuid: appInfoId,
        },
        data: {
          name,
          description,
          currency,
          status,
          language,
          comment,
        },
      });
      return existenceEntityHandler(updatedAppInfo, AppInfoEntity, EntityName.APP_INFO) as AppInfoEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
