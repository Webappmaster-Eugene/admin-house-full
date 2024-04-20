import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export class DeleteGlobalCategoryCommand {
  constructor(
    public readonly globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ) {}
}
