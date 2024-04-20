import { Injectable } from '@nestjs/common';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { IAppInfoService } from './types/app-info.service.interface';
import { AppInfoEntity } from './entities/app-info.entity';
import { AppInfoUpdateRequestDto } from './dto/controller/update-app-info.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAppInfoQuery } from './query/get-app-info/get-app-info.query';
import { UpdateAppInfoCommand } from './command/update-app-info/update-app-info.command';

@Injectable()
export class AppInfoService implements IAppInfoService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async get(): Promise<UniversalInternalResponse<AppInfoEntity>> {
    const appInfo: AppInfoEntity = await this.queryBus.execute(
      new GetAppInfoQuery(),
    );
    return new InternalResponse<AppInfoEntity>(appInfo);
  }

  async update(
    dto: AppInfoUpdateRequestDto,
  ): Promise<UniversalInternalResponse<AppInfoEntity>> {
    const oldAppInfo = await this.queryBus.execute(new GetAppInfoQuery());

    const newAppInfo: AppInfoEntity = await this.commandBus.execute<
      UpdateAppInfoCommand,
      AppInfoEntity
    >(new UpdateAppInfoCommand(oldAppInfo.uuid, dto));

    return new InternalResponse<AppInfoEntity>(newAppInfo);
  }
}
