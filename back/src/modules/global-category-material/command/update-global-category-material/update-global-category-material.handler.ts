import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { KFI } from '../../../../common/utils/di';
import { UpdateGlobalCategoryMaterialCommand } from './update-global-category-material.command';
import { IGlobalCategoryMaterialRepository } from '../../types/global-category-material.repository.interface';

@CommandHandler(UpdateGlobalCategoryMaterialCommand)
export class UpdateGlobalCategoryMaterialHandler implements ICommandHandler<UpdateGlobalCategoryMaterialCommand> {
  constructor(
    @Inject(KFI.GLOBAL_CATEGORY_MATERIAL_REPOSITORY)
    private readonly globalCategoryMaterialRepository: IGlobalCategoryMaterialRepository,
  ) {}

  async execute({ globalCategoryMaterialId, dto }: UpdateGlobalCategoryMaterialCommand) {
    return this.globalCategoryMaterialRepository.updateById(globalCategoryMaterialId, dto);
  }
}
