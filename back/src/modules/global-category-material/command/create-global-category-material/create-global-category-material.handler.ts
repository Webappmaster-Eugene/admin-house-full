import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../../../common/utils/di';
import { CreateGlobalCategoryMaterialCommand } from './create-global-category-material.command';
import { IGlobalCategoryMaterialRepository } from '../../types/global-category-material.repository.interface';

@CommandHandler(CreateGlobalCategoryMaterialCommand)
export class CreateGlobalCategoryMaterialHandler
  implements ICommandHandler<CreateGlobalCategoryMaterialCommand>
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_MATERIAL_REPOSITORY)
    private readonly globalCategoryMaterialRepository: IGlobalCategoryMaterialRepository,
  ) {}
  async execute({ dto }: CreateGlobalCategoryMaterialCommand) {
    return this.globalCategoryMaterialRepository.create(dto);
  }
}
