import { EntityUrlParamCommand } from 'libs/contracts';

export class DeleteGlobalCategoryMaterialCommand {
  constructor(public readonly globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam) {}
}
