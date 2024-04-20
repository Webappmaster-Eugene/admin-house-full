import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllGlobalCategoriesQuery } from './get-all-global-categories.query';
import { Inject } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../../../common/utils/di';
import { IGlobalCategoryRepository } from '../../types/global-category.repository.interface';
import { GetGlobalCategoryByIdQuery } from '../get-global-category-by-id/get-global-category-by-id.query';

@QueryHandler(GetAllGlobalCategoriesQuery)
export class GetAllGlobalCategoriesHandler
  implements IQueryHandler<GetAllGlobalCategoriesQuery>
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_REPOSITORY)
    private readonly globalCategoryRepository: IGlobalCategoryRepository,
  ) {}
  execute({}: GetGlobalCategoryByIdQuery) {
    return this.globalCategoryRepository.getAll();
  }
}
