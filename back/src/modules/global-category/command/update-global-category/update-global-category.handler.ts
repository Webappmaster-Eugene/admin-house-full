import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateGlobalCategoryCommand } from './update-global-category.command';
import { Inject } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../../../common/utils/di';
import { IGlobalCategoryRepository } from '../../types/global-category.repository.interface';

@CommandHandler(UpdateGlobalCategoryCommand)
export class UpdateGlobalCategoryHandler
  implements ICommandHandler<UpdateGlobalCategoryCommand>
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_REPOSITORY)
    private readonly globalCategoryRepository: IGlobalCategoryRepository,
  ) {}

  async execute({ globalCategoryId, dto }: UpdateGlobalCategoryCommand) {
    return this.globalCategoryRepository.updateById(globalCategoryId, dto);
  }
}
