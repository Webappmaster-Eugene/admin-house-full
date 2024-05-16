import { AppInfoUpdateRequestDto } from '../dto/controller/update-app-info.dto';
import { AppInfoEntity } from '../entities/app-info.entity';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export interface IAppInfoRepository {
  get: () => Promise<AppInfoEntity>;
  update: (appInfoId: EntityUrlParamCommand.RequestUuidParam, dto: AppInfoUpdateRequestDto) => Promise<AppInfoEntity>;
}
