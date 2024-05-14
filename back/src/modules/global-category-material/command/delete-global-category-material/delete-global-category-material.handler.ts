import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { KFI } from '../../../../common/utils/di';
import { DeleteGlobalCategoryMaterialCommand } from './delete-global-category-material.command';
import { IGlobalCategoryMaterialRepository } from '../../types/global-category-material.repository.interface';
import { GlobalCategoryMaterialEntity } from '../../entities/global-category-material.entity';

@CommandHandler(DeleteGlobalCategoryMaterialCommand)
export class DeleteGlobalCategoryMaterialHandler
  implements ICommandHandler<DeleteGlobalCategoryMaterialCommand, GlobalCategoryMaterialEntity>
{
  constructor(
    @Inject(KFI.GLOBAL_CATEGORY_MATERIAL_REPOSITORY)
    private readonly globalCategoryMaterialRepository: IGlobalCategoryMaterialRepository,
  ) {}

  async execute({ globalCategoryMaterialId }: DeleteGlobalCategoryMaterialCommand) {
    return this.globalCategoryMaterialRepository.deleteById(globalCategoryMaterialId);
  }
}
