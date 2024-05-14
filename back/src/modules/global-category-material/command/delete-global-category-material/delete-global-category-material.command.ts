import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export class DeleteGlobalCategoryMaterialCommand {
  constructor(
    public readonly globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) {}
}
