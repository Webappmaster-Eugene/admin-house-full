import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGlobalCategoryCommand } from './create-global-category.command';
import { Inject } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../../../common/utils/di';
import { IGlobalCategoryRepository } from '../../types/global-category.repository.interface';

@CommandHandler(CreateGlobalCategoryCommand)
export class CreateGlobalCategoryHandler
  implements ICommandHandler<CreateGlobalCategoryCommand>
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_REPOSITORY)
    private readonly globalCategoryRepository: IGlobalCategoryRepository,
  ) {}
  async execute({ dto }: CreateGlobalCategoryCommand) {
    return this.globalCategoryRepository.create(dto);
  }
}
