import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteGlobalCategoryCommand } from './delete-global-category.command';
import { Inject } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../../../common/utils/di';
import { IGlobalCategoryRepository } from '../../types/global-category.repository.interface';
import { GlobalCategoryEntity } from '../../entities/global-category.entity';

@CommandHandler(DeleteGlobalCategoryCommand)
export class DeleteGlobalCategoryHandler
  implements ICommandHandler<DeleteGlobalCategoryCommand, GlobalCategoryEntity>
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_REPOSITORY)
    private readonly globalCategoryRepository: IGlobalCategoryRepository,
  ) {}

  async execute({ globalCategoryId }: DeleteGlobalCategoryCommand) {
    return this.globalCategoryRepository.deleteById(globalCategoryId);
  }
}
