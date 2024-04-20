import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export class GetGlobalCategoryByIdQuery {
  constructor(
    public readonly globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ) {}
}
