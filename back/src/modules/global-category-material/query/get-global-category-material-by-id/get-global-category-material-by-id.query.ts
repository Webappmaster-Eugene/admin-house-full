import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';
import { IQuery } from '@nestjs/cqrs';

export class GetGlobalCategoryMaterialByIdQuery implements IQuery {
  constructor(
    public readonly globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) {}
}
