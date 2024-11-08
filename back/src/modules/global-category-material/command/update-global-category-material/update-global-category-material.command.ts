import { EntityUrlParamCommand } from 'libs/contracts';
import { ICommand } from '@nestjs/cqrs';
import { GlobalCategoryMaterialUpdateRequestDto } from '../../dto/controller/update-global-category-material.dto';

export class UpdateGlobalCategoryMaterialCommand implements ICommand {
  constructor(
    public readonly globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    public readonly dto: GlobalCategoryMaterialUpdateRequestDto,
  ) {}
}
