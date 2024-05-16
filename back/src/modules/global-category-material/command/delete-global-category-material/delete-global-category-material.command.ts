import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export class DeleteGlobalCategoryMaterialCommand {
  constructor(public readonly globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam) {}
}
