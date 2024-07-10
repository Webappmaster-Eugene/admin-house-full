import { AppInfoUpdateRequestDto } from '../../dto/controller/update-app-info.dto';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { ICommand } from '@nestjs/cqrs';

export class UpdateAppInfoCommand implements ICommand {
  constructor(
    public readonly appInfoId: EntityUrlParamCommand.RequestUuidParam,
    public readonly dto: AppInfoUpdateRequestDto,
  ) {}
}
