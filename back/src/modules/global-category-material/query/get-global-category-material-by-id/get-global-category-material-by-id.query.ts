import { EntityUrlParamCommand } from 'libs/contracts';
import { IQuery } from '@nestjs/cqrs';

export class GetGlobalCategoryMaterialByIdQuery implements IQuery {
  constructor(public readonly globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam) {}
}
