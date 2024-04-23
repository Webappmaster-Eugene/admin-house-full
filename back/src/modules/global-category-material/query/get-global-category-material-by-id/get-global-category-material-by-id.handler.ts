import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGlobalCategoryMaterialByIdQuery } from './get-global-category-material-by-id.query';
import { Inject } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../../../common/utils/di';
import { IGlobalCategoryMaterialRepository } from '../../types/global-category-material.repository.interface';

@QueryHandler(GetGlobalCategoryMaterialByIdQuery)
export class GetGlobalCategoryMaterialByIdHandler
  implements IQueryHandler<GetGlobalCategoryMaterialByIdQuery>
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_MATERIAL_REPOSITORY)
    private readonly globalCategoryMaterialRepository: IGlobalCategoryMaterialRepository,
  ) {}
  execute({ globalCategoryMaterialId }: GetGlobalCategoryMaterialByIdQuery) {
    return this.globalCategoryMaterialRepository.getById(
      globalCategoryMaterialId,
    );
  }
}
