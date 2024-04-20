import { AppInfoUpdateRequestDto } from '../../dto/controller/update-app-info.dto';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export class UpdateAppInfoCommand {
  constructor(
    public readonly appInfoId: EntityUrlParamCommand.RequestUuidParam,
    public readonly dto: AppInfoUpdateRequestDto,
  ) {}
}
