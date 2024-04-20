import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGlobalCategoryByIdQuery } from './get-global-category-by-id.query';
import { Inject } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../../../common/utils/di';
import { IGlobalCategoryRepository } from '../../types/global-category.repository.interface';

@QueryHandler(GetGlobalCategoryByIdQuery)
export class GetGlobalCategoryByIdHandler
  implements IQueryHandler<GetGlobalCategoryByIdQuery>
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_REPOSITORY)
    private readonly globalCategoryRepository: IGlobalCategoryRepository,
  ) {}
  execute({ globalCategoryId }: GetGlobalCategoryByIdQuery) {
    return this.globalCategoryRepository.getById(globalCategoryId);
  }
}
