import { GlobalCategoryUpdateRequestDto } from '../../dto/controller/update-global-category.dto';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export class UpdateGlobalCategoryCommand {
  constructor(
    public readonly globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    public readonly dto: GlobalCategoryUpdateRequestDto,
  ) {}
}
