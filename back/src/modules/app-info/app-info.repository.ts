import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IAppInfoRepository } from './types/app-info.repository.interface';
import { AppInfoUpdateRequestDto } from './dto/controller/update-app-info.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { AppInfoEntity } from './entities/app-info.entity';
import { KFI } from '../../common/utils/di';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { BackendErrorNames, InternalError } from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';

@Injectable()
export class AppInfoRepository implements IAppInfoRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async get(): Promise<AppInfoEntity> {
    try {
      const findedAppInfo = await this.databaseService.appSettings.findFirst();
      if (findedAppInfo) {
        return new AppInfoEntity(findedAppInfo);
      } else {
        throw new NotFoundException({
          message: `AppInfo not found`,
          description: 'AppInfo from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)));
      }

      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
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
      return new AppInfoEntity(updatedAppInfo);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)));
      }

      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }
}
