import { GlobalCategoryUpdateRequestDto } from '../../dto/controller/update-global-category.dto';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';
import { ICommand } from '@nestjs/cqrs';

export class UpdateGlobalCategoryCommand implements ICommand {
  constructor(
    public readonly globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    public readonly dto: GlobalCategoryUpdateRequestDto,
  ) {}
}
